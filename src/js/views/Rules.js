import m from "mithril";

// A view for displaying the rules of the game.
export default class Rules {
  view() {
    return (
      <div class="info-panel max-w-md w-11/12">
        <span class="title">Rules of Hnefatafl</span>
        <ol>
          <li>
            The game is played with a king and twelve defenders against 24
            attackers.
          </li>
          <li>The attackers move first.</li>
          <li>All pieces move along a row or column any number of spaces.</li>
          <li>A moving piece cannot land on another, nor may pieces jump.</li>
          <li>
            No piece but the king can occupy the corner squares or the central
            square.
          </li>
          <li>
            A piece is captured by surrounding it on two opposite sides along a
            row or column with two pieces of your own.
          </li>
          <li>
            It is sometimes possible to capture two or three enemies separately
            (i.e. not two or three enemies in a row) against other pieces of
            your own in a single move.
          </li>
          <li>
            It is also possible to capture a piece against the corner squares,
            or the central square if it is empty, as if one of your pieces were
            sitting on it.
          </li>
          <li>
            The king can only be captured by surrounding him on all four sides.
          </li>
          <li>
            To win, the defenders must get the king to one of the four marked
            corner squares.
          </li>
          <li>The attackers win if they capture the king before he escapes.</li>
        </ol>
        <m.route.Link href="/">← Go back</m.route.Link>
      </div>
    );
  }
}
