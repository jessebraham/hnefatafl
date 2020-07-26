import m from "mithril";

// A view which provides a brief overview of the project, resources used to
// build it, and where to find the source code.
export default class About {
  view() {
    return (
      <div class="info-panel max-w-md w-11/12">
        <span class="title">Hnefatafl</span>
        <p>
          This game is an implementation of Fetlar Hnefatafl built using&nbsp;
          <a href="https://mithril.js.org/">Mithril</a>. It is based on the
          rules as outlined by&nbsp;
          <a href="http://aagenielsen.dk/fetlar_rules_en.php">Aage Nielsen</a>
          &nbsp;and&nbsp;
          <a href="http://tafl.cyningstan.com/data-download/964/fetlar-hnefatafl-leaflet">
            Damian Walker
          </a>
          .
        </p>
        <p>
          Hnefatafl is a game invented by the Norse, popular in the 4th to 12th
          centuries. The Fetlar variant was created in 2008 by the Fetlar
          Hnefatafl Panel as a balanced version of the game for their annual
          tournament.
        </p>
        <p class="mt-4">
          The full source code for this project is available at:
          <a href="https://github.com/jessebraham/hnefatafl" class="block">
            https://github.com/jessebraham/hnefatafl
          </a>
        </p>
        <m.route.Link href="/">← Go back</m.route.Link>
      </div>
    );
  }
}
