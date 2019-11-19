import m from "mithril";

export default class About {
  view() {
    return m("div", { class: "info-panel max-w-md w-11/12" }, [
      m("span", { class: "font-semibold mb-8 text-lg" }, "Hnefatafl"),
      m("p", { class: "mb-4 text-sm md:text-base" }, [
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
      m("p", { class: "mb-8 text-sm md:text-base" }, [
        "Hnefatafl is a game invented by the Norse, popular in the 4th to 12th ",
        "centuries. The Fetlar variant was created in 2008 by the Fetlar ",
        "Hnefatafl Panel as a balanced version of the game for their annual ",
        "tournament.",
      ]),
      m("div", { class: "flex-col mb-8 text-sm md:text-base" }, [
        m("p", "The source code for this project is available at:"),
        m("a", {}, "https://github.com/jessebraham/hnefatafl"),
      ]),
      m("a", { href: "/" }, "← Go back"),
    ]);
  }
}
