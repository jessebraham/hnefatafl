import m from "mithril";

import BoardState from "../models/BoardState";
import { Teams, TeamColours } from "../utils";

// Width/height of the gameboard
// If this value changes, make sure to update the CSS for the center square!
const GAMEBOARD_SIZE = 11;

// Helper functions
const range = size => {
  return [...Array(size).keys()];
};

const getSquare = ({ x, y }) => {
  return document.querySelector(`.row-${y}`).querySelector(`.col-${x}`);
};

const styleSquare = (x, y, text = null, colour = null) => {
  const elem = getSquare({ x, y });
  if (text !== null) elem.innerText = text;
  if (colour !== null) elem.style.color = colour;
};

// Game board component
export default class GameBoard {
  _drawUnits() {
    for (let y = 0; y < GAMEBOARD_SIZE; y++) {
      for (let x = 0; x < GAMEBOARD_SIZE; x++) {
        switch (BoardState.positions[y][x]) {
          case 1:
            styleSquare(x, y, "A", TeamColours[Teams.ATTACKERS]);
            break;
          case 2:
            styleSquare(x, y, "D", TeamColours[Teams.DEFENDERS]);
            break;
          case 3:
            styleSquare(x, y, "K", TeamColours[Teams.DEFENDERS]);
            break;
          default:
            break;
        }
      }
    }
  }

  oncreate(vnode) {
    this._drawUnits();
  }

  onupdate(vnode) {
    this._drawUnits();
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
