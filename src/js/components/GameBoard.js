import m from "mithril";

import { GAMEBOARD_SIZE, Board } from "../models/Board";
import { GameState, Teams } from "../models/GameState";

// Helper functions
const range = size => {
  return [...Array(size).keys()];
};

const areSamePosition = (a, b) => {
  return a !== null && b !== null && a.x === b.x && a.y === b.y;
};

const selectUnit = (x, y) => {
  const belongsToActiveTeam =
    GameState.activeTeam === Teams.ATTACKERS
      ? Board.isAttacker(x, y)
      : Board.isDefender(x, y);

  if (belongsToActiveTeam) {
    Board.activeSquare = { x, y };
    return true;
  }

  return false;
};

// Game board component
export default class GameBoard {
  drawUnits() {
    for (let y = 0; y < GAMEBOARD_SIZE; y++) {
      for (let x = 0; x < GAMEBOARD_SIZE; x++) {
        let text = "";
        if (Board.isAttacker(x, y)) {
          text = "⚔️";
        } else if (Board.isKing(x, y)) {
          text = "👑";
        } else if (Board.isDefender(x, y)) {
          text = "🛡️";
        }

        const elem = document
          .querySelector(`.row-${y}`)
          .querySelector(`.col-${x}`);

        elem.innerText = text;
        elem.style.fontSize = Board.isActive(x, y) ? "1.25rem" : "1rem";
      }
    }
  }

  oncreate(vnode) {
    this.drawUnits();
  }

  onupdate(vnode) {
    this.drawUnits();
  }

  view(vnode) {
    return m(
      "table",
      { class: "game-board" },
      range(GAMEBOARD_SIZE).map(y =>
        m(
          "tr",
          { class: `row-${y}` },
          range(GAMEBOARD_SIZE).map(x => m("td", { class: `col-${x}` })),
        ),
      ),
    );
  }
}
