import m from "mithril";

import { GameBoard, InfoPanel } from "../components";

export default class App {
  view() {
    return m("div", [m(InfoPanel), m(GameBoard)]);
  }
}
