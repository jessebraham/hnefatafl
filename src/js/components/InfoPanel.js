import m from "mithril";

import { Board, Game, Team } from "../models";

// Restart the game, re-initializing all game state.
const restart = () => {
  Board.initialize();
  Game.initialize();
};

// Game active panel component
//
// Default info panel to be shown.
// Displays the active team and provides a link for restarting the game.
class GameActivePanel {
  view() {
    return m("div", { class: "info-panel" }, [
      m("div", [
        m("span", { class: "title flex-1" }, "Hnefatafl"),
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
          Game.winningTeam === null
            ? "Tie!"
            : `${Team.name(Game.winningTeam)} win!`,
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

// Info panel component. Essentially just a proxy view for the GameActivePanel
// and GameOverPanel views defined above.
export default class InfoPanel {
  oninit() {
    restart();
  }

  view() {
    return Game.isOver ? m(GameOverPanel) : m(GameActivePanel);
  }
}
