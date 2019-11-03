import { Board } from "../models";

// Convert an (x, y) coordinate pair to an index in a flat array.
const index = ({ x, y }) => {
  return y * Math.sqrt(Board.size * Board.size) + x;
};

// Extend the Map class and automatically "serialize" the keys.
class SerializingMap extends Map {
  set(key, value) {
    super.set(JSON.stringify(key), value);
  }

  get(key) {
    return super.get(JSON.stringify(key));
  }
}

// A simple graph representation of the game board.
export default class Graph {
  constructor() {
    this.nodes = new SerializingMap();
  }

  addVertex(vertex) {
    this.nodes.set(vertex, []);
  }

  addEdge(a, b) {
    this.nodes.get(a).push(b);
  }

  bfs(start) {
    // Construct an array with each element corresponding to the visited state
    // of a game board square. Make sure the starting square is marked as
    // visited.
    const visited = Board.coordinates.map(
      ({ x, y }) => start.x === x && start.y === y,
    );

    // Enqueue the starting square.
    const queue = [start];
    while (queue.length !== 0) {
      // While there are enqueued squares to visit, dequeue a square and
      // find all of its neighbours.
      const neighbours = this.nodes.get(queue.shift());
      for (let neighbour of neighbours) {
        // If the neighbouring square is a board edge, the unit in question is
        // not surrounded and can escape.
        if (Board.isEdge(neighbour.x, neighbour.y)) {
          return true;
        }

        // If the neighbouring square has not been visited, mark it as visited.
        // If the square is not occupied, enqueue it.
        if (!visited[index(neighbour)]) {
          visited[index(neighbour)] = true;

          if (!Board.isOccupied(neighbour.x, neighbour.y)) {
            queue.push(neighbour);
          }
        }
      }
    }

    return false;
  }
}
