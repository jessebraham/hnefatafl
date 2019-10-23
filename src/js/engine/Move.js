import { Board } from "../models/Board";

export default class Move {
  static isValid(to) {
    // Cannot move to an occupied square
    if (Board.occupied(to.x, to.y)) {
      return false;
    }

    // Movement must be along either of the horizontal or vertical axes
    const from = Board.activeSquare;
    if (!(Move.isHorizontal(from, to) || Move.isVertical(from, to))) {
      return false;
    }

    // The path between the two squares must be clear of any units
    if (!Move.hasClearPath(from, to)) {
      return false;
    }

    // Only the King can occupy the restricted squares (the center, and the
    // four corner squares)
    if (
      Board.isRestricted(to.x, to.y) &&
      !Board.isKing(Board.activeSquare.x, Board.activeSquare.y)
    ) {
      return false;
    }

    // If we make it this far, the move is valid
    return true;
  }

  static isHorizontal(from, to) {
    return from.y === to.y;
  }

  static isVertical(from, to) {
    return from.x === to.x;
  }

  static hasClearPath(from, to) {
    if (Move.isHorizontal(from, to)) {
      const a = Math.min(from.x, to.x) + 1;
      const b = Math.max(from.x, to.x);

      for (let x = a; x < b; x++) {
        if (Board.occupied(x, from.y)) {
          return false;
        }
      }
    } else {
      const a = Math.min(from.y, to.y) + 1;
      const b = Math.max(from.y, to.y);

      for (let y = a; y < b; y++) {
        if (Board.occupied(from.x, y)) {
          return false;
        }
      }
    }

    return true;
  }
}
