import { Board } from "./Board";
import { Team, Teams } from "./Team";

// Game state object
//
// Keep track of the state of an active game, and provide helper functions for
// mutating game state.
const Game = {
  activeTeam: 0,
  turnsElapsed: 0,
  isOver: false,
  winningTeam: null,

  initialize() {
    // Attackers always go first!
    this.activeTeam = Teams.ATTACKERS;
    this.turnsElapsed = 0;
    this.isOver = false;
    this.winningTeam = null;
  },

  get actionText() {
    // TODO: think of other information to potentially display
    if (Board.activeSquare !== null) {
      const active = Board.activeSquare;
      return `Unit selected at (${active.x}, ${active.y})`;
    }
    return "Select a unit";
  },

  advanceTurn() {
    this.activeTeam = Team.not(this.activeTeam);
    this.turnsElapsed++;
  },
};

export { Game };
