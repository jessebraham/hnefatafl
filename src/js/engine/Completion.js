import { Capture, Graph, Move } from ".";
import { Board, Game, Teams } from "../models";

// Game completion class
export default class Completion {
  static get gameHasCompleted() {
    // The following function calls *all* have the potential to mutate Game's
    // internal state.
    this.checkCornersForKing();
    this.checkKingIsSurrounded();
    this.checkIfTeamsCanMove();
    this.checkIfDefendersSurrounded();

    return Game.isOver;
  }

  static checkCornersForKing() {
    const kingIsOccupyingCorner = Object.values(Board.corners).some(corner =>
      Board.isKing(corner.x, corner.y),
    );
    if (kingIsOccupyingCorner) {
      Game.end(Teams.DEFENDERS);
    }
  }

  static checkKingIsSurrounded() {
    const middle = Math.floor(Board.size / 2);
    if (!Board.isKing(middle, middle) && Capture.isCaptured(Board.king)) {
      Game.end(Teams.ATTACKERS);
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
      Game.end(); // Tie
    } else if (attackersCanMove && !defendersCanMove) {
      Game.end(Teams.ATTACKERS);
    } else if (defendersCanMove && !attackersCanMove) {
      Game.end(Teams.DEFENDERS);
    }
  }

  static checkIfDefendersSurrounded() {
    // Construct a graph and add all board squares as its vertices.
    const graph = new Graph();
    Board.coordinates.forEach(vertex => graph.addVertex(vertex));

    // Create edges between each neighbouring square.
    Board.coordinates.forEach(vertex => {
      Object.values(Board.neighbours(vertex))
        .filter(neighbour => !!neighbour)
        .forEach(neighbour => graph.addEdge(vertex, neighbour));
    });

    // Perform a BFS starting from each defender's position, trying to reach
    // a board edge. If any piece can reach the board edge, then the defenders
    // have not be surrounded.
    let canEscape = false;
    Board.defenders.forEach(({ x, y }) => {
      if (graph.bfs({ x, y })) {
        canEscape = true;
      }
    });

    // If the defenders cannot escape, the attackers win.
    if (!canEscape) {
      Game.end(Teams.ATTACKERS);
    }
  }
}
