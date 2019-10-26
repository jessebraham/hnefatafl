// Width/height of the gameboard (always a square)
//
// If this value changes, make sure to update the CSS for the center square!
const GAMEBOARD_SIZE = 11;

// Initial unit positions
//
// Values correspond to those defined by Units.
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

// Board state object
//
// Tracks the positions of each unit on the game board. Provides a number of
// helper functions for interacting with the game board.
const Board = {
  positions: [],
  activeSquare: null,

  initialize() {
    // Clone the initial unit positions array, as it gets mutated if we try to
    // directly assign it.
    this.positions = JSON.parse(JSON.stringify(INITIAL_UNIT_POSITIONS));
    this.activeSquare = null;
  },

  get size() {
    return GAMEBOARD_SIZE;
  },

  get corners() {
    return {
      topLeft: { x: 0, y: 0 },
      topRight: { x: this.size - 1, y: 0 },
      bottomRight: { x: this.size - 1, y: this.size - 1 },
      bottomLeft: { x: 0, y: this.size - 1 },
    };
  },

  moveUnit(x, y) {
    const from = this.activeSquare;
    const unit = this.positions[from.y][from.x];

    this.removeUnit(from.x, from.y);
    this.activeSquare = null;
    this.positions[y][x] = unit;
  },

  removeUnit(x, y) {
    this.positions[y][x] = Units.NONE;
  },

  neighbours(x, y) {
    return {
      top: y === 0 ? null : { x, y: y - 1 },
      right: x === Board.size - 1 ? null : { x: x + 1, y },
      bottom: y === Board.size - 1 ? null : { x, y: y + 1 },
      left: x === 0 ? null : { x: x - 1, y },
    };
  },

  isRestricted(me, x, y) {
    const middle = Math.floor(GAMEBOARD_SIZE / 2);
    const throne = x === middle && y === middle;

    // The king can move anywhere. No squares are considered hostile to him.
    if (Board.isKing(me.x, me.y)) {
      return false;
    }

    // If the throne is occupied, it is not hostile to defenders.
    if (Board.isDefender(me.x, me.y) && Board.isKing(middle, middle)) {
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
    Object.values(this.corners).some(
      corner => corner.x === x && corner.y === y,
    );
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

export { Board };
