import { Point } from '../interfaces';

export function addVisitedLocation(
  { ...currentPosition }: Point,
  [...visitedLocations]: readonly Point[]
): Point[] {
  visitedLocations.push(currentPosition);
  return visitedLocations;
}

export function checkIfLocationSame(
  currentObject: Point,
  objectCheck: Point
): boolean {
  const checkX = currentObject.x == objectCheck.x;
  const checkY = currentObject.y == objectCheck.y;
  return checkX && checkY;
}

export function checkVisitedLocation(
  positionToGo: Point,
  visitedLocations: readonly Point[]
): boolean {
  const visitedAnyLocation = !visitedLocations.every((location) => {
    return !checkIfLocationSame(positionToGo, location);
  });
  return visitedAnyLocation;
}
