// Width/height of the gameboard
// If this value changes, make sure to update the CSS for the center square!
const GAMEBOARD_SIZE = 11;

// Initial unit positions
//
// Values correspond to those defined by Units below.
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
// These values should never need to change, unless the rules are drastically
// modified.
const Units = Object.freeze({ NONE: 0, ATTACKER: 1, DEFENDER: 2, KING: 3 });

// Board state object
//
// Tracks the positions of each unit on the game board. Provides a number of
// helper functions for interacting with the game board.
const Board = {
  positions: [],
  activeSquare: null,

  initialize() {
    Board.positions = INITIAL_UNIT_POSITIONS;
  },

  at(x, y) {
    return Board.positions[y][x];
  },

  set(x, y, unit) {
    Board.positions[y][x] = unit;
  },

  move(from, to) {
    const value = Board.at(from.x, from.y);
    Board.set(from.x, from.y, Units.NONE);
    Board.set(to.x, to.y, value);
  },

  occupied(x, y) {
    return Board.at(x, y) !== Units.NONE;
  },

  isRestricted(x, y) {
    // Only the King can occupy the center and four corner squares
    const max = GAMEBOARD_SIZE - 1;
    const middle = Math.floor(GAMEBOARD_SIZE / 2);

    return (
      (x === 0 && y === 0) ||
      (x === max && y === 0) ||
      (x === middle && y === middle) ||
      (x === 0 && y === max) ||
      (x === max && y === max)
    );
  },

  isActive(x, y) {
    return (
      Board.activeSquare !== null &&
      Board.activeSquare.x === x &&
      Board.activeSquare.y === y
    );
  },

  isAttacker(x, y) {
    return Board.at(x, y) === Units.ATTACKER;
  },

  isDefender(x, y) {
    return Board.at(x, y) === Units.DEFENDER || Board.at(x, y) === Units.KING;
  },

  isKing(x, y) {
    return Board.at(x, y) === Units.KING;
  },
};

export { GAMEBOARD_SIZE, Board, Units };
