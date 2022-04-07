interface Point {
  x: number;
  y: number;
}

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

const currentPositions: Point = Object.freeze({
  x: 3,
  y: 0,
});

const visitedLocations: readonly Point[] = Object.freeze([]);

function moveRight(currentPositions: Point): Point {
  const { ...object } = currentPositions;
  object.x += 1;
  return object;
}

function moveLeft(currentPositions: Point): Point {
  const { ...object } = currentPositions;
  object.x -= 1;
  return object;
}

function moveAbove(currentPositions: Point): Point {
  const { ...object } = currentPositions;
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

// function checkVisitedLocation(
//   currentPositions: Point,
//   visitedLocations: readonly Point[]
// ) {
//   const visitedAnyLocation = visitedLocations.map((location) =>
//     checkIfLocationSame(currentPositions, location)
//   );
//   visitedAnyLocation.forEach((location) => {
//     if (location) {
//       return true;
//     }
//   })
// }

function* moveNextPositionGen(currentPosition: Point, maxPoint: Point) {
  if (checkMoveRight(currentPositions, maxPoint)) {
    currentPosition = moveRight(currentPosition);
    yield true;
  } else {
    yield false;
  }
  if (checkMoveLeft(currentPosition)) {
    currentPosition = moveLeft(currentPosition);
    yield true;
  } else {
    yield false;
  }
  if (checkMoveAbove(currentPosition, maxPoint)) {
    currentPosition = moveAbove(currentPosition);
    yield true;
  } else {
    yield false;
  }
}

function moveNextPosition(
  currentPosition: Point,
  maxPoint: Point,
  visitedLocations: readonly Point[]
) {
  for (const move of moveNextPositionGen(currentPosition, maxPoint)) {
    if (move) {
      const locations = addVisitedLocation(currentPosition, visitedLocations);
      moveNextPosition(currentPositions, maxPoint, locations);
    } else {
      continue;
    }
  }
}

moveNextPosition(currentPositions, maxPoint, visitedLocations);

console.log(currentPositions.x);
