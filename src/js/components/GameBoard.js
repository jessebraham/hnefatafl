import m from "mithril";

import Capture from "../engine/Capture";
import Move from "../engine/Move";
import { Board, Game } from "../models";

// Helper functions
const parseIntFromClass = elem => {
  return parseInt(elem.classList[0].split("-")[1], 10);
};

const range = size => {
  return [...Array(size).keys()];
};

// Game board component
export default class GameBoard {
  clickHandler(e) {
    // Use the cell's and row's classes to determine the (x, y) coordinates of
    // the square.
    const x = parseIntFromClass(e.target);
    const y = parseIntFromClass(e.target.parentElement);

    if (Board.isActive(x, y)) {
      // If the square clicked is the active square, deselect it.
      Board.activeSquare = null;
    } else if (Board.belongsTo(x, y, Game.activeTeam)) {
      // If the square clicked belongs to the active team, select it.
      Board.activeSquare = { x, y };
    } else if (Move.isValid({ x, y })) {
      // If the move from the active square to the clicked square is valid,
      // perform the move and deselect the active square.
      Board.moveUnit(x, y);
      Board.activeSquare = null;

      // Check the board for captures, eliminating any units who are captured.
      const captures = Capture.findCaptures(x, y);
      if (captures.length > 0) {
        captures.forEach(({ x, y }) => Board.removeUnit(x, y));
      }

      // Advance to the next turn.
      Game.advanceTurn();
    }
  }

  drawUnits() {
    for (let y = 0; y < Board.size; y++) {
      for (let x = 0; x < Board.size; x++) {
        // Unoccupied squares have no text.
        // Occupied squres have different icons for each unit type.
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

        // Set the text of the square, as well as its 'style.fontSize'
        // attribute. Selected squares have their font size increased.
        elem.innerText = text;
        elem.style.fontSize = Board.isActive(x, y) ? "1.25rem" : "1rem";
      }
    }
  }

  oncreate() {
    this.drawUnits();
  }

  onupdate() {
    this.drawUnits();
  }

  view() {
    return m(
      "table",
      { class: "game-board" },
      range(Board.size).map(y =>
        m(
          "tr",
          { class: `row-${y}` },
          range(Board.size).map(x =>
            m("td", { class: `col-${x}`, onclick: this.clickHandler }),
          ),
        ),
      ),
    );
  }
}
