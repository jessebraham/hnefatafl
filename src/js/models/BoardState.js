// Initial unit positions
//
// Unoccupied positions are represented by the integer 0.
// Attackers are repesented by the integer 1.
// Defenders are repesented by the integer 2.
// The king is repesented by the integer 3.
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

// Board state object
const BoardState = {
  positions: [],
  activeSquare: null,

  initialize() {
    BoardState.positions = INITIAL_UNIT_POSITIONS;
  },
};

export default BoardState;
