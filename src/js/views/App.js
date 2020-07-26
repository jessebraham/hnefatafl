import m from "mithril";

import { GameBoard, InfoPanel } from "../components";

export default class App {
  view() {
    return (
      <div>
        <InfoPanel />
        <GameBoard />
      </div>
    );
  }
}
