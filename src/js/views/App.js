import m from "mithril";

import GameBoard from "../components/GameBoard";
import InfoPanel from "../components/InfoPanel";

import { Board, Game } from "../models";

export default class App {
  oncreate(vnode) {
    Board.initialize();
    Game.initialize();
  }

  view(vnode) {
    return m("div", [m(InfoPanel), m(GameBoard)]);
  }
}
