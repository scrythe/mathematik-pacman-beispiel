import { Point, XandYAchses } from '../interfaces.js';

function createTo2DArray(): readonly XandYAchses[] {
  const twoDArray: readonly XandYAchses[] = Object.freeze([
    /* y 4 */ [0, 0, 0, 0, 0],
    /* y 3 */ [0, 0, 0, 0, 0],
    /* y 2 */ [0, 0, 0, 0, 0],
    /* y 1 */ [0, 0, 0, 0, 0],
    /* y 0 */ [0, 0, 0, 0, 0],
    // ------- 0  1  2  3  4
  ]);
  return twoDArray;
}

function assignTwoDArray(
  point: Point,
  twoDArray: readonly XandYAchses[],
  place: number
) {
  twoDArray[point.y][point.x] = place;
  return twoDArray;
}

function assigntMultipleToTwoDArray(pathToEnd: Point[]) {
  const twoDArray = createTo2DArray();
  for (let index = 0; index < pathToEnd.length; index++) {
    const place = index + 1;
    assignTwoDArray(pathToEnd[index], twoDArray, place);
  }
  return twoDArray;
}

// [{"x":2,"y":0},{"x":3,"y":0},{"x":4,"y":0},{"x":4,"y":1},{"x":3,"y":1},{"x":2,"y":1},{"x":1,"y":1},{"x":0,"y":1},{"x":0,"y":2},{"x":1,"y":2},{"x":2,"y":2},{"x":3,"y":2},{"x":4,"y":2},{"x":4,"y":3},{"x":3,"y":3},{"x":2,"y":3},{"x":1,"y":3},{"x":0,"y":3},{"x":0,"y":4},{"x":1,"y":4},{"x":2,"y":4}]

const pathToEndExample: Point[] = [
  { x: 2, y: 0 },
  { x: 3, y: 0 },
  { x: 4, y: 0 },
  { x: 4, y: 1 },
  { x: 3, y: 1 },
  { x: 2, y: 1 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 3, y: 2 },
  { x: 4, y: 2 },
  { x: 4, y: 3 },
  { x: 3, y: 3 },
  { x: 2, y: 3 },
  { x: 1, y: 3 },
  { x: 0, y: 3 },
  { x: 0, y: 4 },
  { x: 1, y: 4 },
  { x: 2, y: 4 },
];

const endResultOfTwoDArray = assigntMultipleToTwoDArray(pathToEndExample);
console.log(endResultOfTwoDArray);
