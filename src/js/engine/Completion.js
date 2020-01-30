import { Capture, Move } from ".";
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
    const coord = Board.coordinates.filter(({ x, y }) => Board.isKing(x, y));
    const king = coord.length ? coord[0] : null;
    const middle = Math.floor(Board.size / 2);

    if (!Board.isKing(middle, middle) && Capture.isCaptured(king)) {
      Game.end(Teams.ATTACKERS);
    }
  }

  static checkIfTeamsCanMove() {
    const attackers = Board.coordinates.filter(({ x, y }) =>
      Board.isAttacker(x, y),
    );
    const defenders = Board.coordinates.filter(({ x, y }) =>
      Board.isDefender(x, y),
    );

    const attackersCanMove = attackers.some(({ x, y }) => Move.canMove(x, y));
    const defendersCanMove = defenders.some(({ x, y }) => Move.canMove(x, y));

    if (!attackersCanMove && !defendersCanMove) {
      Game.end(); // Tie
    } else if (attackersCanMove && !defendersCanMove) {
      Game.end(Teams.ATTACKERS);
    } else if (defendersCanMove && !attackersCanMove) {
      Game.end(Teams.DEFENDERS);
    }
  }

  static checkIfDefendersSurrounded() {
    // Perform a BFS starting from each defender's position, trying to reach
    // a board edge. If any piece can reach the board edge, then the defenders
    // have not be surrounded.
    let canEscape = false;
    Board.coordinates
      .filter(({ x, y }) => Board.isDefender(x, y))
      .forEach(({ x, y }) => {
        if (Completion.pathToEdgeExists({ x, y })) {
          canEscape = true;
          return true; // break out of `forEach` early
        }
      });

    // If the defenders cannot escape, the attackers win.
    if (!canEscape) {
      Game.end(Teams.ATTACKERS);
    }
  }

  static pathToEdgeExists(start) {
    // Construct an array with each element corresponding to the visited state
    // of a game board square. Make sure the starting square is marked as
    // visited.
    const visited = Board.coordinates.map(
      ({ x, y }) => start.x === x && start.y === y,
    );

    // Enqueue the starting square. Perform BFS (sorta) on it.
    const queue = [start];
    while (queue.length !== 0) {
      // While there are enqueued squares to visit, dequeue a square and
      // find all of its neighbours.
      const neighbours = Board.nodes.get(queue.shift());
      for (let neighbour of neighbours) {
        // If the neighbouring square is a board edge, the unit in question is
        // not surrounded and can escape.
        if (Board.isEdge(neighbour.x, neighbour.y)) {
          return true;
        }

        // If the neighbouring square has not been visited, mark it as visited.
        // If the square is not occupied, enqueue it.
        const index = neighbour.y * Board.size + neighbour.x;
        if (!visited[index]) {
          visited[index] = true;

          if (!Board.isOccupied(neighbour.x, neighbour.y)) {
            queue.push(neighbour);
          }
        }
      }
    }

    return false;
  }
}
