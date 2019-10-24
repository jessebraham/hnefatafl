import { Board } from "./Board";

// Team "enum" and corresponding human-readable names.
const Teams = Object.freeze({ ATTACKERS: 0, DEFENDERS: 1 });
const TeamNames = ["Attackers", "Defenders"];

// Game state object
const GameState = {
  activeTeam: 0,
  turnsElapsed: 0,
  gameOver: false,
  winningTeam: null,

  initialize() {
    // Attackers always go first
    this.activeTeam = Teams.ATTACKERS;
    this.turnsElapsed = 0;
    this.gameOver = false;
    this.winningTeam = null;
  },

  activeTeamName() {
    return TeamNames[this.activeTeam];
  },

  winningTeamName() {
    return TeamNames[this.winningTeam];
  },

  inactiveTeam() {
    return this.activeTeam === Teams.ATTACKERS
      ? Teams.DEFENDERS
      : Teams.ATTACKERS;
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
    this.activeTeam = this.inactiveTeam();
    this.turnsElapsed++;
  },
};

export { GameState, Teams, TeamNames };
