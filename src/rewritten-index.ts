interface Point {
  x: number;
  y: number;
}

interface MoveFunc {
  (currentPosition: Point): Point;
}

interface CheckFunc {
  (currentPosition: Point, maxPoint: Point): boolean;
}

function moveRight(currentPosition: Point): Point {
  const { ...object } = currentPosition;
  object.x += 1;
  return object;
}

function moveLeft(currentPosition: Point): Point {
  const { ...object } = currentPosition;
  object.x -= 1;
  return object;
}

function moveAbove(currentPosition: Point): Point {
  const { ...object } = currentPosition;
  object.y += 1;
  return object;
}

function checkMoveRight(currentPositions: Point, maxPoint: Point): boolean {
  return currentPositions.x + 1 <= maxPoint.x;
}

function checkMoveLeft(currentPositions: Point): boolean {
  return currentPositions.x - 1 >= 0;
}

function checkMoveAbove(currentPositions: Point, maxPoint: Point): boolean {
  return currentPositions.y + 1 <= maxPoint.y;
}

function addVisitedLocation(
  currentPosition: Point,
  visitedLocations: readonly Point[]
) {
  const { ...visitedLocation } = currentPosition;
  const [...locations] = visitedLocations;
  locations.push(visitedLocation);
  return locations;
}

function checkIfLocationSame(
  currentObject: Point,
  objectCheck: Point
): boolean {
  const checkX = currentObject.x == objectCheck.x;
  const checkY = currentObject.y == objectCheck.y;
  return checkX && checkY;
}

function checkVisitedLocation(
  positionToGo: Point,
  visitedLocations: readonly Point[]
): boolean {
  const visitedAnyLocation = !visitedLocations.every((location) => {
    return !checkIfLocationSame(positionToGo, location);
  });
  return visitedAnyLocation;
}

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

function moveNextPosition(
  currentPosition: Point,
  maxPoint: Point,
  visitedLocations: readonly Point[]
): void {
  for (const move of moveNextPositionGen(
    currentPosition,
    maxPoint,
    visitedLocations
  )) {
    if (!move) continue;
    currentPosition = move;
    const locations = addVisitedLocation(currentPosition, visitedLocations);
    moveNextPosition(currentPosition, maxPoint, locations);
  }
}

function startProgramm() {
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

  const currentPosition: Point = Object.freeze({
    x: 3,
    y: 0,
  });

  const visitedLocations: readonly Point[] = Object.freeze([currentPosition]);

  moveNextPosition(currentPosition, maxPoint, visitedLocations);
}

startProgramm();
