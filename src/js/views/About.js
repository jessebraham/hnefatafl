import m from "mithril";

// A view which provides a brief overview of the project, resources used to
// build it, and where to find the source code.
export default class About {
  view() {
    return m("div", { class: "info-panel max-w-md w-11/12" }, [
      m("span", { class: "title" }, "Hnefatafl"),
      m("p", [
        "This game is an implementation of Fetlar Hnefatafl built using ",
        m("a", { href: "https://mithril.js.org/" }, "Mithril"),
        ". It is based on the rules as outlined by ",
        m(
          "a",
          { href: "http://aagenielsen.dk/fetlar_rules_en.php" },
          "Aage Nielsen",
        ),
        " and ",
        m(
          "a",
          {
            href:
              "http://tafl.cyningstan.com/data-download/964/fetlar-hnefatafl-leaflet",
          },
          "Damian Walker",
        ),
        ".",
      ]),
      m("p", [
        "Hnefatafl is a game invented by the Norse, popular in the 4th to 12th ",
        "centuries. The Fetlar variant was created in 2008 by the Fetlar ",
        "Hnefatafl Panel as a balanced version of the game for their annual ",
        "tournament.",
      ]),
      m("p", { class: "mt-4" }, [
        "The full source code for this project is available at:",
        m(
          "a",
          { class: "block", href: "https://github.com/jessebraham/hnefatafl" },
          "https://github.com/jessebraham/hnefatafl",
        ),
      ]),
      m("a", { href: "#!/" }, "← Go back"),
    ]);
  }
}
