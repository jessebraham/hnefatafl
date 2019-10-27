import { Board } from ".";

// Team "enum"
const Teams = Object.freeze({ ATTACKERS: 0, DEFENDERS: 1 });

// Team model object
const Team = {
  teamOf(unit) {
    const { x, y } = unit;
    if (Board.isAttacker(x, y)) {
      return Teams.ATTACKERS;
    } else if (Board.isDefender(x, y)) {
      return Teams.DEFENDERS;
    }
    return null;
  },

  name(team) {
    return team === Teams.ATTACKERS ? "Attackers" : "Defenders";
  },

  not(team) {
    return team === Teams.ATTACKERS ? Teams.DEFENDERS : Teams.ATTACKERS;
  },

  onSame(team, other) {
    return this.teamOf(team) === this.teamOf(other);
  },

  onDifferent(team, other) {
    return !this.onSame(team, other);
  },
};

// Unit model object
const Unit = {
  belongsTo(unit, team) {
    const { x, y } = unit;
    return team === Teams.ATTACKERS
      ? Board.isAttacker(x, y)
      : Board.isDefender(x, y);
  },
};

export { Team, Teams, Unit };
