const getCoordinate = elem => {
  // Use the cell's and row's classes to determine the (x, y) coordinates of
  // the square.
  const x = parseIntFromClass(elem); // <td>
  const y = parseIntFromClass(elem.parentElement); // <tr>
  return { x, y };
};

const getSquare = ({ x, y }) => {
  return document.querySelector(`.row-${y}`).querySelector(`.col-${x}`);
};

const parseIntFromClass = elem => {
  return parseInt(elem.classList[0].split("-")[1], 10);
};

const range = size => {
  return [...Array(size).keys()];
};

export { getCoordinate, getSquare, range };
