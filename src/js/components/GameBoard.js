import m from "mithril";

import { Capture, Completion, Move } from "../engine";
import { Board, Game, Team } from "../models";

// Determine the (x, y) coordinates of a given element from the class names of
// it and its parent row.
const getCoordinate = elem => {
  return {
    x: parseIntFromClass(elem), // <td>
    y: parseIntFromClass(elem.parentElement), // <tr>
  };
};

// Extract the numeric portion of an element's class name. Classes are either
// 'col-n' or 'row-n', where 'n' is the integer we're extracting.
const parseIntFromClass = elem => {
  return parseInt(elem.classList[0].split("-")[1], 10);
};

// Given the desired size, construct an array containing every value from 0 to
// `size` - 1.
const range = size => {
  return [...Array(size).keys()];
};

// Game board component
export default class GameBoard {
  clickHandler(e) {
    // If no square is selected and an empty square is clicked, we do nothing
    // and return early.
    const { x, y } = getCoordinate(e.target);
    if (Board.activeSquare === null && !Board.isOccupied(x, y)) {
      return;
    }

    // 1. If the square clicked is the active square, deselect it
    // 2. If the square clicked belongs to the active team, select it
    // 3. If moving the active unit to the clicked square is valid...
    //    a. move the unit and deselect the active square
    //    b. check if any units were captured as a result of this move, removing
    //       any that were
    //    c. check if the game has completed, setting the winner if it has and
    //       advancing to the next turn if it has not
    if (Board.isActive(x, y)) {
      Board.setActive(null);
    } else if (Team.isOnTeam({ x, y }, Game.activeTeam)) {
      Board.setActive({ x, y });
    } else if (Move.isValid(Board.activeSquare, { x, y })) {
      Board.moveUnitTo(x, y);

      // Remove any captured units *except* the king, as if he is captured the
      // game is over (see below).
      Capture.findCaptures(x, y)
        .filter(({ x, y }) => !Board.isKing(x, y))
        .forEach(({ x, y }) => Board.removeUnit(x, y));

      // Keep advancing to the next turn unless the game has ended.
      if (!Completion.gameHasCompleted) {
        Game.advanceTurn();
      }
    }
  }

  drawUnits() {
    Board.coordinates.forEach(({ x, y }) => {
      // Occupied squres have different icons for each unit type. Unoccupied
      // squares have no text.
      const elem = Board.getElem({ x, y });
      if (Board.isAttacker(x, y)) {
        elem.innerText = "⚔️";
      } else if (Board.isKing(x, y)) {
        elem.innerText = "👑";
      } else if (Board.isDefender(x, y)) {
        elem.innerText = "🛡️";
      } else {
        elem.innerText = "";
      }

      // Selected squares have their font size increased as a
      // visual indicator.
      elem.style.fontSize = Board.isActive(x, y) ? "1.25rem" : "1rem";
    });
  }

  oncreate() {
    // Make sure to initialize the Board and Game state objects once the
    // GameBoard component has been created.
    Board.initialize();
    Game.initialize();

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
        m("tr", { class: `row-${y}` }, [
          range(Board.size).map(x =>
            m("td", { class: `col-${x}`, onclick: this.clickHandler }),
          ),
        ]),
      ),
    );
  }
}
