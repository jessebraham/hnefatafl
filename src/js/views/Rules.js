import m from "mithril";

export default class Rules {
  view() {
    return m("div", { class: "info-panel max-w-md w-11/12" }, [
      m(
        "span",
        { class: "font-semibold mb-4 md:mb-8 text-lg" },
        "Rules of Hnefatafl",
      ),
      m("ol", { class: "mb-4 md:mb-8 text-sm md:text-base" }, [
        m(
          "li",
          "The game is played with a king and twelve defenders against 24 attackers.",
        ),
        m("li", "The attackers move first."),
        m("li", "All pieces move along a row or column any number of spaces."),
        m("li", "A moving piece cannot land on another, nor may pieces jump."),
        m(
          "li",
          "No piece but the king can occupy the corner squares or the central square.",
        ),
        m(
          "li",
          "A piece is captured by surrounding it on two opposite sides along a row or column with two pieces of your own.",
        ),
        m(
          "li",
          "It is sometimes possible to capture two or three enemies separately (i.e. not two or three enemies in a row) against other pieces of your own in a single move.",
        ),
        m(
          "li",
          "It is also possible to capture a piece against the corner squares, or the central square if it is empty, as if one of your pieces were sitting on it.",
        ),
        m(
          "li",
          "The king can only be captured by surrounding him on all four sides.",
        ),
        m(
          "li",
          "To win, the defenders must get the king to one of the four marked corner squares.",
        ),
        m(
          "li",
          "The attackers win if they capture the king before he escapes.",
        ),
      ]),
      m("a", { href: "/", class: "text-sm md:text-base" }, "← Go back"),
    ]);
  }
}
