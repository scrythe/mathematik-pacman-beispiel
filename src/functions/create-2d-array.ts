import { Point, Line } from '../interfaces.js';
import { readFile } from './read-file-and-write.js';
import { CheerioAPI, load } from 'cheerio';

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

function createAndAssignSvg(arrayOfCoords: Point[]) {
  const svgData = readFile('grid-module.svg');
  const $ = load(svgData);
  arrayOfCoords.forEach(({ x, y }, index) => {
    const element = $(`.x${x}y${y}`);
    element.attr('fill', ColorSteps[index]);
  });
  const lineCoords = createSvgLineCoords(arrayOfCoords);
  lineCoords.forEach((line) => {
    // <line x1="30" y1="10" x2="100" y2="200" stroke="black" />;
    const lineSvg = `<line x1=${line.start.x} y1=${line.start.y} x2=${line.end.x} y2=${line.end.y} stroke="white" stroke-width=5 />`;
    $('svg').append(lineSvg);
  });
  const svgText = $('svg').parent().html();
  return svgText;
}

function createLineCoords(arrayOfCoords: Point[]) {
  const lineCoordsArray: Line[] = [];
  for (let index = 1; index < arrayOfCoords.length; index++) {
    const start = arrayOfCoords[index - 1];
    const end = arrayOfCoords[index];
    const lineCoords: Line = { start, end };
    lineCoordsArray.push(lineCoords);
  }
  return lineCoordsArray;
}

function createSvgLineCoords(arrayOfCoords: Point[]) {
  const svgData = readFile('grid-module.svg');
  const $ = load(svgData);
  const lineCoordsArray = createLineCoords(arrayOfCoords);
  const svgLineCoordsArray = lineCoordsArray.map((line) => {
    const { start, end } = line;
    const startBox = getMiddleOfBox(start, $);
    const endBox = getMiddleOfBox(end, $);
    if (!startBox) return;
    if (!endBox) return;
    const newLine: Line = { start: startBox, end: endBox };
    return newLine;
  });
  const filteredSvgLineCoordsArray = svgLineCoordsArray.filter(
    (svg): svg is Line => !!svg
  );
  return filteredSvgLineCoordsArray;
}

function getMiddleOfBox(box: Point, $: CheerioAPI): Point | undefined {
  const boxElement = $(`.x${box.x}y${box.y}`);
  const boxX = boxElement.attr('x');
  const boxY = boxElement.attr('y');
  if (!boxX) return;
  if (!boxY) return;
  const x = parseInt(boxX) + 24;
  const y = parseInt(boxY) + 24;
  const middle: Point = { x, y };
  return middle;
}

export function multipleTwoDArrays(AllPathsToEnd: Array<Point[]>) {
  const TwoDArrayOfAllPaths = AllPathsToEnd.map(createAndAssignSvg);
  const filteredTwoDArray = TwoDArrayOfAllPaths.filter(
    (svg): svg is string => !!svg
  );
  const $ = load('<body></body>');
  filteredTwoDArray.forEach((svg) => {
    $('body').append(svg);
  });
  return $.html();
}
