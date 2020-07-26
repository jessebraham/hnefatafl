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
    return (
      <div class="info-panel">
        <div>
          <span class="title flex-1">Hnefatafl</span>
          <m.route.Link href="/rules">Rules</m.route.Link>
          <m.route.Link href="/about" class="ml-6">
            About
          </m.route.Link>
        </div>
        <div>
          <p>
            <span>{`${Team.name(Game.activeTeam)}' turn`}</span>
          </p>
          <a href="#" onclick={restart}>
            Restart
          </a>
        </div>
      </div>
    );
  }
}

// Game over panel component
//
// Displayed instead of the default info panel when the game has completed.
// Provides a link for restarting the game.
class GameOverPanel {
  view() {
    return (
      <div class="info-panel">
        <div class="flex-col">
          <p class="font-light mb-2 text-center text-2xl tracking-wide">
            {Game.winningTeam === null
              ? "Tie!"
              : `${Team.name(Game.winningTeam)} win!`}
          </p>
          <a href="#" class="text-center" onclick={restart}>
            Restart
          </a>
        </div>
      </div>
    );
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
