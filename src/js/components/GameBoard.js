import m from "mithril";

import { Capture, Completion, Move } from "../engine";
import { Board, Game, Team } from "../models";

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
    const x = parseIntFromClass(e.target); // <td>
    const y = parseIntFromClass(e.target.parentElement); // <tr>

    // 1. If the square clicked is the active square, deselect it
    // 2. If the square clicked belongs to the active team, select it
    // 3. If moving the active unit to the clicked square is valid...
    //    a. move the unit and deselect the active square
    //    b. check if any units were captured as a result of this move, removing
    //       any that were
    //    c. check if the game has completed, setting the winner if it has and
    //       advancing to the next turn if it has not
    if (Board.isActive(x, y)) {
      Board.activeSquare = null;
    } else if (Team.isOnTeam({ x, y }, Game.activeTeam)) {
      Board.activeSquare = { x, y };
    } else if (Move.isValid({ x, y })) {
      Board.moveUnit(x, y);

      Capture.findCaptures(x, y)
        .filter(({ x, y }) => !Board.isKing(x, y))
        .forEach(({ x, y }) => Board.removeUnit(x, y));

      if (!Completion.gameHasCompleted) {
        Game.advanceTurn();
      }
    }
  }

  drawUnits() {
    range(Board.size).forEach(y =>
      range(Board.size).forEach(x => {
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
        // attribute. Selected squares have their font size increased as a
        // visual indicator.
        elem.innerText = text;
        elem.style.fontSize = Board.isActive(x, y) ? "1.25rem" : "1rem";
      }),
    );
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
