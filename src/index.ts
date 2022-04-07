import { Point, ResultObject } from './interfaces.js';
import { moveNextPosition } from './path-functions.js';

function startProgramm(): void {
  const maxPoint: Point = Object.freeze({
    x: 5,
    y: 5,
  });

  const startPoint: Point = Object.freeze({
    x: 3,
    y: 0,
  });

  const endPoint: Point = Object.freeze({
    x: 3,
    y: 5,
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
  const allPathsToEndJSON = JSON.stringify(allPathsToEnd);
  console.log(allPathsToEndJSON);
}

startProgramm();
