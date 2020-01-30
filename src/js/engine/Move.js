import { Board } from "../models";

// Move class, responsible for validating moves performed by units.
export default class Move {
  static isValid(from, to) {
    // Cannot move to an occupied square
    if (Board.isOccupied(to.x, to.y)) {
      return false;
    }

    // Movement must be along either of the horizontal or vertical axes
    if (!(Move.isHorizontal(from, to) || Move.isVertical(from, to))) {
      return false;
    }

    // The path between the two squares must be clear of any units
    if (!Move.pathIsClear(from, to)) {
      return false;
    }

    // Only the King can occupy the restricted squares (the center, and the
    // four corner squares)
    // `Board.isRestricted` checks the unit type, so in turn nothing is ever
    // restricted for the King.
    if (Board.isRestricted(from, to)) {
      return false;
    }

    // If we make it this far, the move is valid
    return true;
  }

  static canMove(x, y) {
    return Object.values(Board.neighbours({ x, y })).some(
      neighbour =>
        neighbour !== null &&
        !Board.isOccupied(neighbour.x, neighbour.y) &&
        !Board.isRestricted({ x, y }, neighbour),
    );
  }

  static isHorizontal(from, to) {
    return from.y === to.y;
  }

  static isVertical(from, to) {
    return from.x === to.x;
  }

  static pathIsClear(from, to) {
    if (Move.isHorizontal(from, to)) {
      // horizontal move
      const a = Math.min(from.x, to.x) + 1;
      const b = Math.max(from.x, to.x);

      for (let x = a; x < b; x++) {
        if (Board.isOccupied(x, from.y)) {
          return false;
        }
      }
    } else {
      // vertical move
      const a = Math.min(from.y, to.y) + 1;
      const b = Math.max(from.y, to.y);

      for (let y = a; y < b; y++) {
        if (Board.isOccupied(from.x, y)) {
          return false;
        }
      }
    }

    return true;
  }
}
