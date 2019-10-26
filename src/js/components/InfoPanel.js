import m from "mithril";

import { Board, Game, Team } from "../models";

// Helper functions
const restart = () => {
  Board.initialize();
  Game.initialize();
};

// Info panel component
export default class InfoPanel {
  view() {
    return Game.isOver ? m(GameOverPanel) : m(GameActivePanel);
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
        m("p", [m("span", "Next up"), m("span", Team.name(Game.activeTeam))]),
        m("p", [m("span", "Turns Elapsed"), m("span", Game.turnsElapsed)]),
      ]),
      m("div", [
        Game.actionText,
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
          Game.winningTeam !== null
            ? `${Team.name(Game.winningTeam)} win!`
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
