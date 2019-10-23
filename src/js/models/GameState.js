// Team "enum" and corresponding human-readable names.
const Teams = Object.freeze({ ATTACKERS: 0, DEFENDERS: 1 });
const TeamNames = ["Attackers", "Defenders"];

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

  inactiveTeam() {
    return this.activeTeam === Teams.ATTACKERS
      ? Teams.DEFENDERS
      : Teams.ATTACKERS;
  },

  advanceTurn() {
    this.activeTeam = this.inactiveTeam();
    this.turnsElapsed++;
  },
};

export { GameState, Teams, TeamNames };
