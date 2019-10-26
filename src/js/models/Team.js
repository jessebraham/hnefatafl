import { Board } from ".";

// Team "enum"
const Teams = Object.freeze({ ATTACKERS: 0, DEFENDERS: 1 });

// Team model object
const Team = {
  name(team) {
    return team === Teams.ATTACKERS ? "Attackers" : "Defenders";
  },

  not(team) {
    return team === Teams.ATTACKERS ? Teams.DEFENDERS : Teams.ATTACKERS;
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
