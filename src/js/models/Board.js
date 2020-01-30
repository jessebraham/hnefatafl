// Width/height of the gameboard (always a square)
//
// If this value changes, make sure to update the CSS for colouring the center
// square!
const GAMEBOARD_SIZE = 11;

// Initial unit positions
//
// Values correspond to those defined by Unit type "enum" below.
const INITIAL_UNIT_POSITIONS = [
  [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 1],
  [1, 1, 0, 2, 2, 3, 2, 2, 0, 1, 1],
  [1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
];

// Unit type "enum"
const Units = Object.freeze({ NONE: 0, ATTACKER: 1, DEFENDER: 2, KING: 3 });

// Extend the Map class and automatically "serialize" the keys.
class SerializingMap extends Map {
  set(key, value) {
    super.set(JSON.stringify(key), value);
  }

  get(key) {
    return super.get(JSON.stringify(key));
  }
}

// Board state object
//
// Tracks the positions of each unit on the game board. Provides a number of
// helper functions for interacting with the game board.
export const Board = {
  coordinates: [],
  nodes: null,
  positions: [],
  activeSquare: null,

  initialize() {
    // Construct and store an array of all possible coordinates for the board.
    this.coordinates = [];
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        this.coordinates.push({ x, y });
      }
    }

    // Construct a graph whose vertices are squares on the board and edges are
    // valid moves between them.
    this.nodes = new SerializingMap();
    this.coordinates.forEach(vertex => this.nodes.set(vertex, []));
    this.coordinates.forEach(vertex => {
      Object.values(Board.neighbours(vertex))
        .filter(neighbour => neighbour !== null)
        .forEach(neighbour => this.nodes.get(vertex).push(neighbour));
    });

    // Clone the initial unit positions array, as it gets mutated by gameplay
    // if we try to directly assign it directly.
    this.positions = JSON.parse(JSON.stringify(INITIAL_UNIT_POSITIONS));
    this.activeSquare = null;
  },

  //
  // read-only properties
  //

  get size() {
    return GAMEBOARD_SIZE;
  },

  get corners() {
    // The four corners of the board (restricted squares).
    return {
      topLeft: { x: 0, y: 0 },
      topRight: { x: this.size - 1, y: 0 },
      bottomRight: { x: this.size - 1, y: this.size - 1 },
      bottomLeft: { x: 0, y: this.size - 1 },
    };
  },

  //
  // public methods
  //

  getElem({ x, y }) {
    return document.querySelector(`.row-${y}`).querySelector(`.col-${x}`);
  },

  setActive(coord) {
    if (this.activeSquare !== null) {
      Board.getElem(this.activeSquare).classList.remove("active");
    }

    this.activeSquare = coord;
    if (this.activeSquare !== null) {
      Board.getElem(this.activeSquare).classList.add("active");
    }
  },

  moveUnitTo(x, y) {
    // Store the type of unit occupying the active square.
    const from = this.activeSquare;
    const unit = this.positions[from.y][from.x];

    // Remove the unit occupying the active square and deselect it.
    this.removeUnit(from.x, from.y);
    this.setActive(null);

    // Place the unit at the new position.
    this.positions[y][x] = unit;
  },

  removeUnit(x, y) {
    this.positions[y][x] = Units.NONE;
  },

  neighbours({ x, y }) {
    // Return all neighbouring squares (ie. left, right, top, bottom) relative
    // to the provided coordinate.
    return {
      top: y === 0 ? null : { x, y: y - 1 },
      right: x === Board.size - 1 ? null : { x: x + 1, y },
      bottom: y === Board.size - 1 ? null : { x, y: y + 1 },
      left: x === 0 ? null : { x: x - 1, y },
    };
  },

  isRestricted(unit, { x, y }) {
    const middle = Math.floor(GAMEBOARD_SIZE / 2);
    const throne = x === middle && y === middle;

    // The king can move anywhere. No squares are considered hostile to him.
    // However when the king is beside the throne, it is considered hostile.
    if (Board.isKing(unit.x, unit.y)) {
      return throne;
    }

    // If the throne is occupied, it is not hostile to defenders.
    if (Board.isDefender(unit.x, unit.y) && Board.isKing(middle, middle)) {
      return this.isCorner(x, y);
    }

    // All restricted squares are hostile to attackers at all times, and to
    // defenders if the throne is not occupied.
    return throne || this.isCorner(x, y);
  },

  isActive(x, y) {
    return (
      this.activeSquare !== null &&
      this.activeSquare.x === x &&
      this.activeSquare.y === y
    );
  },

  isCorner(x, y) {
    return Object.values(this.corners).some(
      corner => corner.x === x && corner.y === y,
    );
  },

  isEdge(x, y) {
    return x === 0 || x === this.size - 1 || y === 0 || y === this.size - 1;
  },

  isOccupied(x, y) {
    return this.positions[y][x] !== Units.NONE;
  },

  isAttacker(x, y) {
    return this.positions[y][x] === Units.ATTACKER;
  },

  isDefender(x, y) {
    return this.positions[y][x] === Units.DEFENDER || this.isKing(x, y);
  },

  isKing(x, y) {
    return this.positions[y][x] === Units.KING;
  },
};
