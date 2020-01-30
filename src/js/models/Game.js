import { Board } from "./Board";

// Team "enum"
const Teams = Object.freeze({ ATTACKERS: 0, DEFENDERS: 1 });

// Team helper class
class Team {
  static name(team) {
    return team === Teams.ATTACKERS ? "Attackers" : "Defenders";
  }

  static same(a, b) {
    return this.teamOf(a) === this.teamOf(b);
  }

  static isOnTeam({ x, y }, team) {
    return team === Teams.ATTACKERS
      ? Board.isAttacker(x, y)
      : Board.isDefender(x, y);
  }

  static teamOf({ x, y }) {
    if (!Board.isOccupied(x, y)) {
      return null;
    }
    return Board.isAttacker(x, y) ? Teams.ATTACKERS : Teams.DEFENDERS;
  }
}

// Game state object
//
// Keep track of the state of an active game, and provide helper functions for
// mutating game state.
const Game = {
  activeTeam: null,
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
    this.activeTeam =
      this.activeTeam === Teams.ATTACKERS ? Teams.DEFENDERS : Teams.ATTACKERS;
  },
};

export { Game, Team, Teams };
