import m from "mithril";

import { Board } from "../models/Board";
import { GameState } from "../models/GameState";

// Helper functions
const restart = () => {
  Board.initialize();
  GameState.initialize();
};

// Info panel component
export default class InfoPanel {
  view() {
    if (GameState.gameOver) {
      return m(GameOverPanel);
    }
    return m(GameActivePanel);
  }
}

// Game active panel component
//
// Default info panel to be shown.
// Display the active team, the number of turns elapsed, some help text, and
// provides a link for restarting the game.
class GameActivePanel {
  view() {
    return m("div", { class: "info-panel" }, [
      m("div", [
        m("p", [m("span", "Next up"), m("span", GameState.activeTeamName())]),
        m("p", [m("span", "Turns Elapsed"), m("span", GameState.turnsElapsed)]),
      ]),
      m("div", [
        GameState.actionText(),
        m("a", { href: "#", onclick: restart }, "Restart"),
      ]),
    ]);
  }
}

// Game over panel component
//
// Displayed instead of the default info panel when the game has completed.
// Provides a link for restarting the game.
class GameOverPanel {
  view() {
    return m("div", { class: "info-panel" }, [
      m("div", { class: "flex-col" }, [
        m(
          "p",
          { class: "flex-1 mb-2 text-center" },
          GameState.winningTeam !== null
            ? `${GameState.winningTeamName()} win!`
            : "Tie!",
        ),
        m(
          "a",
          {
            href: "#",
            onclick: restart,
            class: "flex-1 text-center text-lg hover:underline",
          },
          "Restart",
        ),
      ]),
    ]);
  }
}
