import { Point } from '../interfaces.js';

type XandYAchses = [number, number, number, number, number];

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

function assignTwoDArray({ x, y }: Point) {
  const twoDArray = createTo2DArray();
  twoDArray[y][x] = 3;
  return twoDArray;
}

const twoDArray = assignTwoDArray({ x: 2, y: 0 });
console.log(twoDArray);
