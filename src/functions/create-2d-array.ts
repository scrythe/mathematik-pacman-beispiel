import { Point } from '../interfaces.js';
import { readFile } from './read-file-and-write.js';
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
