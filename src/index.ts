import { Point, ResultObject } from './interfaces.js';
import { moveNextPosition } from './path-functions.js';

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
  // const allPathsToEndJSON = JSON.stringify(allPathsToEnd);
  // console.log(allPathsToEndJSON);
}

startProgramm();
