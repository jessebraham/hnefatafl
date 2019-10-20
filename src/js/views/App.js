import m from "mithril";

import GameBoard from "../components/GameBoard";
import BoardState from "../models/BoardState";

export default class App {
  oncreate(vnode) {
    BoardState.initialize();
  }

  view(vnode) {
    return m(GameBoard);
  }
}
