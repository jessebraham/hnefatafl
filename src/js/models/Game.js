import { Board, Teams } from "./Board";

// Helper functions
const teamName = team => {
  return team === Teams.ATTACKERS ? "Attackers" : "Defenders";
};

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

  get activeTeamName() {
    return teamName(this.activeTeam);
  },

  get winningTeamName() {
    return teamName(this.winningTeam);
  },

  actionText() {
    // TODO: think of other information to potentially display
    if (Board.activeSquare !== null) {
      const active = Board.activeSquare;
      return `Unit selected at (${active.x}, ${active.y})`;
    }
    return "Select a unit";
  },

  advanceTurn() {
    this.activeTeam =
      this.activeTeam === Teams.ATTACKERS ? Teams.DEFENDERS : Teams.ATTACKERS;
    this.turnsElapsed++;
  },
};

export { Game };
