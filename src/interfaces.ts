export interface Point {
  x: number;
  y: number;
}

export interface MoveFunc {
  (currentPosition: Point): Point;
}

export interface CheckFunc {
  (currentPosition: Point, maxPoint: Point): boolean;
}

export interface ResultObject {
  numberOfMethods: number;
  allPathsToEnd: Array<Point[]>;
}

export interface Line {
  start: Point;
  end: Point;
}
