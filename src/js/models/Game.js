import { Board } from "./Board";

// Team "enum"
const Teams = Object.freeze({ ATTACKERS: 0, DEFENDERS: 1 });

// Team helper class
class Team {
  static name(team) {
    return team === Teams.ATTACKERS ? "Attackers" : "Defenders";
  }

  static not(team) {
    return team === Teams.ATTACKERS ? Teams.DEFENDERS : Teams.ATTACKERS;
  }

  static teamOf({ x, y }) {
    if (!Board.isOccupied(x, y)) {
      return null;
    }
    return Board.isAttacker(x, y) ? Teams.ATTACKERS : Teams.DEFENDERS;
  }

  static isOnTeam({ x, y }, team) {
    return team === Teams.ATTACKERS
      ? Board.isAttacker(x, y)
      : Board.isDefender(x, y);
  }

  static areOnSame(a, b) {
    return this.teamOf(a) === this.teamOf(b);
  }
}

// Game state object
//
// Keep track of the state of an active game, and provide helper functions for
// mutating game state.
const Game = {
  activeTeam: 0,
  isOver: false,
  winningTeam: null,

  initialize() {
    // Attackers always go first!
    this.activeTeam = Teams.ATTACKERS;
    this.isOver = false;
    this.winningTeam = null;
  },

  end(winner = null) {
    Game.isOver = true;
    Game.winningTeam = winner;
  },

  advanceTurn() {
    this.activeTeam = Team.not(this.activeTeam);
  },
};

export { Game, Team, Teams };
