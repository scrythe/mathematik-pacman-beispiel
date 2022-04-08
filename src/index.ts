import { Point, ResultObject } from './interfaces.js';
import { moveNextPosition } from './path-functions.js';
import { multipleTwoDArrays } from './functions/create-2d-array.js';

function startProgramm(): void {
  const maxPoint: Point = Object.freeze({
    x: 4,
    y: 4,
  });

  const startPoint: Point = Object.freeze({
    x: 2,
    y: 0,
  });

  const endPoint: Point = Object.freeze({
    x: 2,
    y: 4,
  });

  const currentPosition = Object.freeze({ ...startPoint });

  const visitedLocations: readonly Point[] = Object.freeze([startPoint]);
  let resultObject: ResultObject = {
    numberOfMethods: 0,
    allPathsToEnd: [],
  };
  const { numberOfMethods, allPathsToEnd } = moveNextPosition(
    currentPosition,
    maxPoint,
    endPoint,
    visitedLocations,
    resultObject
  );
  console.log(numberOfMethods);
  const AllVisualPathsToEnd = multipleTwoDArrays(allPathsToEnd);
  const AllVisualPathsToEndJSON = JSON.stringify(AllVisualPathsToEnd); // going to do it with svg later instead
  console.log(AllVisualPathsToEndJSON);
}

startProgramm();
// janidator69;
// dggggsss;
