import { Point, MoveFunc, CheckFunc, ResultObject } from './interfaces.js';

import {
  moveRight,
  moveLeft,
  moveAbove,
  checkMoveRight,
  checkMoveLeft,
  checkMoveAbove,
} from './functions/move-and-check.js';
import {
  addVisitedLocation,
  checkIfLocationSame,
  checkVisitedLocation,
} from './functions/location-functions.js';

function checkAndMoveNextPosition(
  checkFunc: CheckFunc,
  moveFunc: MoveFunc,
  currentPosition: Point,
  maxPoint: Point,
  visitedLocations: readonly Point[]
): false | Point {
  if (!checkFunc(currentPosition, maxPoint)) return false;
  const positionToGo = moveFunc(currentPosition);
  if (checkVisitedLocation(positionToGo, visitedLocations)) return false;
  return positionToGo;
}

function* moveNextPositionGen(
  currentPosition: Point,
  maxPoint: Point,
  visitedLocations: readonly Point[]
): Generator<false | Point> {
  // Right
  yield checkAndMoveNextPosition(
    checkMoveRight,
    moveRight,
    currentPosition,
    maxPoint,
    visitedLocations
  );
  // Left
  yield checkAndMoveNextPosition(
    checkMoveLeft,
    moveLeft,
    currentPosition,
    maxPoint,
    visitedLocations
  );
  // Above
  yield checkAndMoveNextPosition(
    checkMoveAbove,
    moveAbove,
    currentPosition,
    maxPoint,
    visitedLocations
  );
}

export function moveNextPosition(
  currentPosition: Point,
  maxPoint: Point,
  endPoint: Point,
  visitedLocations: readonly Point[],
  { ...resultObject }: ResultObject
): ResultObject {
  for (const move of moveNextPositionGen(
    currentPosition,
    maxPoint,
    visitedLocations
  )) {
    if (!move) continue;
    if (checkIfLocationSame(move, endPoint)) {
      resultObject.numberOfMethods += 1;
      const [...pathToEnd] = visitedLocations;
      resultObject.allPathsToEnd.push(pathToEnd);
      return resultObject;
    }
    currentPosition = move;
    const locations = addVisitedLocation(currentPosition, visitedLocations);
    resultObject = moveNextPosition(
      currentPosition,
      maxPoint,
      endPoint,
      locations,
      resultObject
    );
  }
  return resultObject;
}
