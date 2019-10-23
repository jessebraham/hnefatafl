import m from "mithril";

import { GameState } from "../models/GameState";

// Info panel component
export default class InfoPanel {
  view(vnode) {
    return m("div", { class: "info-panel" }, [
      m("p", [
        m("span", "Current Team: "),
        m("span", GameState.activeTeamName()),
      ]),
      m("p", [m("span", "Turns Elapsed: "), m("span", GameState.turnsElapsed)]),
    ]);
  }
}
