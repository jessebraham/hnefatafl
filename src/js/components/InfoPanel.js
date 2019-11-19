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
// Displays the active team and provides a link for restarting the game.
class GameActivePanel {
  view() {
    return m("div", { class: "info-panel" }, [
      m("div", { class: "mb-8" }, [
        m("span", { class: "flex-1 font-semibold text-lg" }, "Hnefatafl"),
        m("a", { href: "#!/rules" }, "Rules"),
        m("a", { href: "#!/about", class: "ml-6" }, "About"),
      ]),
      m("div", [
        m("p", [m("span", `${Team.name(Game.activeTeam)}' turn`)]),
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
          { class: "font-light mb-2 text-center text-2xl tracking-wide" },
          Game.winningTeam !== null
            ? `${Team.name(Game.winningTeam)} win!`
            : "Tie!",
        ),
        m(
          "a",
          { href: "#", onclick: restart, class: "text-center" },
          "Restart",
        ),
      ]),
    ]);
  }
}
