import { Capture, Move } from ".";
import { Board, Game, Teams } from "../models";

// Helper functions
const completeGame = (winner = null) => {
  Game.isOver = true;
  Game.winningTeam = winner;
};

export default class Completion {
  static get gameHasCompleted() {
    // The following function calls *all* have the potential to mutate Game's
    // internal state.
    this.checkCornersForKing();
    this.checkKingIsSurrounded();
    this.checkIfTeamsCanMove();

    return Game.isOver;
  }

  static checkCornersForKing() {
    if (
      Object.values(Board.corners).some(corner =>
        Board.isKing(corner.x, corner.y),
      )
    ) {
      completeGame(Teams.DEFENDERS);
    }
  }

  static checkKingIsSurrounded() {
    const middle = Math.floor(Board.size / 2);
    if (!Board.isKing(middle, middle) && Capture.isCaptured(Board.king)) {
      completeGame(Teams.ATTACKERS);
    }
  }

  static checkIfTeamsCanMove() {
    const attackersCanMove = Board.attackers.some(({ x, y }) =>
      Move.canMove(x, y),
    );
    const defendersCanMove = Board.defenders.some(({ x, y }) =>
      Move.canMove(x, y),
    );
    if (!attackersCanMove && !defendersCanMove) {
      completeGame(); // Tie
    } else if (attackersCanMove && !defendersCanMove) {
      completeGame(Teams.ATTACKERS);
    } else if (defendersCanMove && !attackersCanMove) {
      completeGame(Teams.DEFENDERS);
    }
  }
}
