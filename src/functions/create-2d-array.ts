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

export function multipleTwoDArrays(AllPathsToEnd: Array<Point[]>) {
  const TwoDArrayOfAllPaths = AllPathsToEnd.map(assigntMultipleToTwoDArray);
  return TwoDArrayOfAllPaths;
}
