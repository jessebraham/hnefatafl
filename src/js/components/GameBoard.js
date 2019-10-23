import m from "mithril";

import Move from "../engine/Move";
import { GAMEBOARD_SIZE, Board } from "../models/Board";
import { GameState, Teams } from "../models/GameState";

// Helper functions
const parseIntFromClass = elem => {
  return parseInt(elem.classList[0].split("-")[1], 10);
};

const belongsToActiveTeam = (x, y) => {
  return GameState.activeTeam === Teams.ATTACKERS
    ? Board.isAttacker(x, y)
    : Board.isDefender(x, y);
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
    } else if (belongsToActiveTeam(x, y)) {
      // If the square clicked belongs to the active team, select it.
      Board.activeSquare = { x, y };
    } else if (Move.isValid({ x, y })) {
      // If the move from the active square to the clicked square is valid,
      // perform the move, deselect the active square, and end the turn.
      Board.move(Board.activeSquare, { x, y });
      Board.activeSquare = null;
      GameState.advanceTurn();
    }
  }

  drawUnits() {
    for (let y = 0; y < GAMEBOARD_SIZE; y++) {
      for (let x = 0; x < GAMEBOARD_SIZE; x++) {
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
      range(GAMEBOARD_SIZE).map(y =>
        m(
          "tr",
          { class: `row-${y}` },
          range(GAMEBOARD_SIZE).map(x =>
            m("td", { class: `col-${x}`, onclick: this.clickHandler }),
          ),
        ),
      ),
    );
  }
}
