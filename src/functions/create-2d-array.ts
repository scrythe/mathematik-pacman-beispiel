import { Point, XandYAchses } from '../interfaces.js';
import { readFile } from './read-file.js';
import { load } from 'cheerio';

enum ColorSteps {
  '#d9ed92',
  '#b5e48c',
  '#99d98c',
  '#76c893',
  '#52b69a',
  '#34a0a4',
  '#168aad',
  '#1a759f',
  '#1e6091',
  '#184e77',
  '#0b090a',
  '#161a1d',
  '#660708',
  '#a4161a',
  '#ba181b',
  '#e5383b',
  '#f94144',
  '#f3722c',
  '#f8961e',
  '#f9844a',
  '#f9c74f',
  '#90be6d',
  '#43aa8b',
  '#4d908e',
  '#577590',
  '#277da1',
}

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
  twoDArray: XandYAchses[],
  place: number
) {
  twoDArray[point.y][point.x] = place;
  return twoDArray;
}

function assigntMultipleToTwoDArray(pathToEnd: Point[]): XandYAchses[] {
  const [...twoDArray] = createTo2DArray();
  for (let index = 0; index < pathToEnd.length; index++) {
    const place = index + 1;
    assignTwoDArray(pathToEnd[index], twoDArray, place);
  }
  return twoDArray;
}

function createAndAssignSvg(arrayOfCoords: Point[]) {
  const svgData = readFile('grid-module.svg');
  const $ = load(svgData);
  arrayOfCoords.forEach(({ x, y }, index) => {
    $(`.x${x}y${y}`).attr('fill', ColorSteps[index]);
  });
  const svgText = $('svg').parent().html();
  return svgText;
}

export function multipleTwoDArrays(AllPathsToEnd: Array<Point[]>) {
  const TwoDArrayOfAllPaths = AllPathsToEnd.map(assigntMultipleToTwoDArray);
  return TwoDArrayOfAllPaths;
}

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

const svgText = createAndAssignSvg(pathToEndExample);
console.log(svgText);
