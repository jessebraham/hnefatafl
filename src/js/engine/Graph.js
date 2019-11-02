import { Board } from "../models";

export default class Graph {
  constructor(nVertices) {
    this.nVertices = nVertices;
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    this.adjacencyList.set(JSON.stringify(vertex), []);
  }

  addEdge(a, b) {
    this.adjacencyList.get(JSON.stringify(a)).push(b);
  }

  bfs(start) {
    // Convert an (x, y) coordinate pair to an index in a flat array.
    const index = ({ x, y }) => y * Math.sqrt(this.nVertices) + x;

    // Create an array with an element corresponding to the visited state of
    // each board square, initializing them all to false (except the starting
    // square).
    const visited = Board.coordinates.map(() => false);
    visited[index(start)] = true;

    // Enqueue only the starting square initially.
    const queue = [start];

    while (queue.length !== 0) {
      // While there are enqueued squares to visit, dequeue a square and
      // determine its neighbours.
      const elem = queue.shift();
      const neighbours = this.adjacencyList.get(JSON.stringify(elem));

      // Iterate through the array of neighbours. If the neighbouring square is
      // a board edge, the unit in question can escape so return early.
      for (let neighbour of neighbours) {
        const { x, y } = neighbour;
        if (Board.isEdge(x, y)) {
          return true;
        }

        // If the neighbouring square has not been visited, mark it as visited.
        // If the square is not occupied, enqueue it to be searched.
        if (!visited[index(neighbour)]) {
          visited[index(neighbour)] = true;

          if (!Board.isOccupied(x, y)) {
            queue.push(neighbour);
          }
        }
      }
    }

    return false;
  }
}
