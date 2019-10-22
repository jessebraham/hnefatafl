import m from "mithril";

import GameBoard from "../components/GameBoard";
import InfoPanel from "../components/InfoPanel";

import BoardState from "../models/BoardState";
import GameState from "../models/GameState";

export default class App {
  oncreate(vnode) {
    BoardState.initialize();
    GameState.initialize();
  }

  view(vnode) {
    return m("div", [m(InfoPanel), m(GameBoard)]);
  }
}
