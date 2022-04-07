import { Point } from '../interfaces';

export function moveRight({ ...currentPosition }: Point): Point {
  currentPosition.x += 1;
  return currentPosition;
}

export function moveLeft({ ...currentPosition }: Point): Point {
  currentPosition.x -= 1;
  return currentPosition;
}

export function moveAbove({ ...currentPosition }: Point): Point {
  currentPosition.y += 1;
  return currentPosition;
}

export function checkMoveRight(
  currentPositions: Point,
  maxPoint: Point
): boolean {
  return currentPositions.x + 1 <= maxPoint.x;
}

export function checkMoveLeft(currentPositions: Point): boolean {
  return currentPositions.x - 1 >= 0;
}

export function checkMoveAbove(
  currentPositions: Point,
  maxPoint: Point
): boolean {
  return currentPositions.y + 1 <= maxPoint.y;
}
