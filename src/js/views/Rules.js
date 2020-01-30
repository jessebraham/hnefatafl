import m from "mithril";

// A simple utility class for instantiating an ordered list a more concise and
// compact way.
class OrderedList {
  view({ children }) {
    return m(
      "ol",
      children.map(item => m("li", item)),
    );
  }
}

// A view for displaying the rules of the game.
export default class Rules {
  view() {
    return m("div", { class: "info-panel max-w-md w-11/12" }, [
      m("span", { class: "title" }, "Rules of Hnefatafl"),
      m(OrderedList, [
        "The game is played with a king and twelve defenders against 24 attackers.",
        "The attackers move first.",
        "All pieces move along a row or column any number of spaces.",
        "A moving piece cannot land on another, nor may pieces jump.",
        "No piece but the king can occupy the corner squares or the central square.",
        "A piece is captured by surrounding it on two opposite sides along a row or column with two pieces of your own.",
        "It is sometimes possible to capture two or three enemies separately (i.e. not two or three enemies in a row) against other pieces of your own in a single move.",
        "It is also possible to capture a piece against the corner squares, or the central square if it is empty, as if one of your pieces were sitting on it.",
        "The king can only be captured by surrounding him on all four sides.",
        "To win, the defenders must get the king to one of the four marked corner squares.",
        "The attackers win if they capture the king before he escapes.",
      ]),
      m("a", { href: "#!/" }, "← Go back"),
    ]);
  }
}
