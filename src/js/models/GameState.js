import { Teams, TeamNames } from "../utils";

// Game state object
const GameState = {
  activeTeam: 0,
  turnsElapsed: 0,

  initialize() {
    // Attackers always go first
    this.activeTeam = Teams.ATTACKERS;
    this.turnsElapsed = 0;
  },

  activeTeamName() {
    return TeamNames[this.activeTeam];
  },

  advanceTurn() {
    if (this.activeTeam === Teams.ATTACKERS) {
      this.activeTeam = Teams.DEFENDERS;
    } else {
      this.activeTeam = Teams.ATTACKERS;
    }

    this.turnsElapsed++;
  },
};

export default GameState;
