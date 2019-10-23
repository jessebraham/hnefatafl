import m from "mithril";

import GameBoard from "../components/GameBoard";
import InfoPanel from "../components/InfoPanel";

import { Board } from "../models/Board";
import { GameState } from "../models/GameState";

export default class App {
  oncreate(vnode) {
    Board.initialize();
    GameState.initialize();
  }

  view(vnode) {
    return m("div", [m(InfoPanel), m(GameBoard)]);
  }
}
