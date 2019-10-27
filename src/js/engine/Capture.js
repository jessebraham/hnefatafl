import { Board, Team } from "../models";

// Helper functions
const areHostile = (a, b) => {
  return Board.isRestricted(a, b) || Team.onDifferent(a, b);
};

// Capture class
//
// Determines if a moves results in a hostile unit being captured. Multiple
// captures can occur with a single move.
export default class Capture {
  static findCaptures(x, y) {
    const me = { x, y };

    // Determine which, if any, of the squares neighbouring the current
    // position are hostile.
    const neighbours = Board.neighbours(me);
    const hostiles = Object.values(neighbours).filter(
      neighbour => neighbour !== null && areHostile(me, neighbour),
    );

    // Further filter down any hostile squares to those which have been
    // `me` captured `hostile` approaching by the previous move.
    return hostiles.filter(hostile => this.isCaptured(hostile));
  }

  static isCaptured(hostile) {
    const horizontal = this.isHorizontallyCaptured(hostile);
    const vertical = this.isVerticallyCaptured(hostile);

    // If the hostile unit is the King, he must be captured horizontally *and*
    // vertically.
    if (Board.isKing(hostile.x, hostile.y)) {
      return horizontal && vertical;
    }

    // All remaining units must be captured either horizontally or vertically.
    return horizontal || vertical;
  }

  static isHorizontallyCaptured(unit) {
    const { left, right } = Board.neighbours(unit);
    return this.isDirectionallyCaptured(unit, left, right);
  }

  static isVerticallyCaptured(unit) {
    const { top, bottom } = Board.neighbours(unit);
    return this.isDirectionallyCaptured(unit, top, bottom);
  }

  static isDirectionallyCaptured(unit, a, b) {
    // `a` or `b` being null means the units is at one of the board edges, so
    // the unit cannot be captured.
    if (a === null || b === null) {
      return false;
    }

    // If either `a` or `b` are on the same team as the unit, the unit cannot
    // be captured.
    if (Team.onSame(unit, a) || Team.onSame(unit, b)) {
      return false;
    }

    // If either `a` or `b` are unoccupied and are not restricted squares, the
    // unit cannot be captured.
    if (
      (!Board.isOccupied(a.x, a.y) && !Board.isRestricted(unit, a)) ||
      (!Board.isOccupied(b.x, b.y) && !Board.isRestricted(unit, b))
    ) {
      return false;
    }

    return true;
  }
}
