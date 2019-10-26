import { Board } from "../models";

// Helper functions
const areHostile = (me, other) => {
  if (other === null) {
    return false;
  }

  const restricted = Board.isRestricted(me, other.x, other.y);
  const otherTeam = Board.isAttacker(me.x, me.y)
    ? Board.isDefender(other.x, other.y)
    : Board.isAttacker(other.x, other.y);

  return restricted || otherTeam;
};

const sameTeam = (me, other) => {
  if (other === null) {
    return false;
  }
  return Board.isAttacker(me.x, me.y)
    ? Board.isAttacker(other.x, other.y)
    : Board.isDefender(other.x, other.y);
};

// Capture class
//
// ???
export default class Capture {
  static findCaptures(x, y) {
    const neighbours = Board.neighbours(x, y);
    const hostiles = Object.values(neighbours).filter(neighbour =>
      areHostile({ x, y }, neighbour),
    );
    const captures = hostiles.filter(h => this.isCaptured({ x, y }, h));
    return captures;
  }

  static isCaptured(me, hostile) {
    return (
      this.isHorizontalCapture(me, hostile) ||
      this.isVerticalCapture(me, hostile)
    );
  }

  static isHorizontalCapture(me, hostile) {
    const neighbours = Board.neighbours(hostile.x, hostile.y);

    // captured from the left (M -> H)
    const leftCapture = hostile.x > me.x && sameTeam(me, neighbours.right);
    // captured from the right (M <- H)
    const rightCapture = hostile.x < me.x && sameTeam(me, neighbours.left);

    return leftCapture || rightCapture;
  }

  static isVerticalCapture(me, hostile) {
    const neighbours = Board.neighbours(hostile.x, hostile.y);

    // captured from the top (M v H)
    const topCapture = hostile.y > me.y && sameTeam(me, neighbours.bottom);
    // captured from the bottom (M ^ H)
    const bottomCapture = hostile.y < me.y && sameTeam(me, neighbours.top);

    return topCapture || bottomCapture;
  }
}
