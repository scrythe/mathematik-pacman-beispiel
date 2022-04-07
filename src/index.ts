interface Position {
  x: number;
  y: number;
}

const maxPostion: Position = {
  x: 5,
  y: 5,
};

const startPosition: Position = {
  x: 3,
  y: 0,
};

const endPosition: Position = {
  x: 3,
  y: 5,
};

const currentPosition: Position = {
  x: 3,
  y: 0,
};

const alreadyVisited: Position[] = [];
alreadyVisited.push(startPosition);

function goRight(): void {
  currentPosition.x += 1;
}

function goLeft(): void {
  currentPosition.x -= 1;
}

function goAbove(): void {
  currentPosition.y += 1;
}

function checkIfAtStartPosition(): boolean {
  const checkX = currentPosition.x == startPosition.x;
  const checkY = currentPosition.y == startPosition.y;
  return checkX && checkY;
}

function checkIfAtEndPosition(): boolean {
  const checkX = currentPosition.x == endPosition.x;
  const checkY = currentPosition.y == endPosition.y;
  return checkX && checkY;
}

function checkIfPossibleToMoveRight(): boolean {
  return currentPosition.x + 1 <= maxPostion.x;
}

function checkIfPossibleToMoveLeft(): boolean {
  return currentPosition.x - 1 >= 0;
}

function checkIfPossibleToMoveAbove(): boolean {
  return currentPosition.y + 1 <= maxPostion.x;
}

/* function checkIfMoveable(positionToGo: Position) {
  const moveableToDirection =
    checkIfPossibleToMoveRight() &&
    checkIfPossibleToMoveLeft() &&
    checkIfPossibleToMoveAbove();
  const moveableToPoints = checkIfLocationVisited(positionToGo);
  return moveableToDirection && moveableToPoints;
}
 */

function checkIfMoveable() {
  const moveableToRightObject = {
    x: currentPosition.x + 1,
    y: currentPosition.y,
  };
  const moveableToLeftObject = {
    x: currentPosition.x - 1,
    y: currentPosition.y,
  };
  const moveableToAboveObject = {
    x: currentPosition.x,
    y: currentPosition.y + 1,
  };
  const moveableToRight =
    checkIfPossibleToMoveRight() &&
    checkIfLocationVisited(moveableToRightObject);
  const moveableToLeft =
    checkIfPossibleToMoveLeft() && checkIfLocationVisited(moveableToLeftObject);
  const moveableToAbove =
    checkIfPossibleToMoveAbove() &&
    checkIfLocationVisited(moveableToAboveObject);
  return moveableToRight && moveableToLeft && moveableToAbove;
}

function addVisitedLocation(): void {
  alreadyVisited.push({ ...currentPosition });
}

function checkIfLocationVisited(positionToGo: Position): boolean {
  const visitedLocations = alreadyVisited.map((location) => {
    const checkX = positionToGo.x == location.x;
    const checkY = positionToGo.y == location.y;
    return checkX && checkY;
  });
  for (let index = 0; index < visitedLocations.length; index++) {
    const location = visitedLocations[index];
    if (location) return true;
  }
  return false;
}

function movePacman(direction: string): boolean {
  let moved = false;
  switch (direction) {
    case 'right':
      if (checkIfPossibleToMoveRight()) {
        const visitingLocation: Position = {
          x: currentPosition.x + 1,
          y: currentPosition.y,
        };
        if (!checkIfLocationVisited(visitingLocation)) {
          goRight();
          moved = true;
        }
      }
      break;
    case 'left':
      if (checkIfPossibleToMoveLeft()) {
        const visitingLocation: Position = {
          x: currentPosition.x - 1,
          y: currentPosition.y,
        };
        if (!checkIfLocationVisited(visitingLocation)) {
          goLeft();
          moved = true;
        }
      }
      break;
    case 'above':
      if (checkIfPossibleToMoveAbove()) {
        const visitingLocation: Position = {
          x: currentPosition.x,
          y: currentPosition.y + 1,
        };
        if (!checkIfLocationVisited(visitingLocation)) {
          goAbove();
          moved = true;
        }
      }
      break;
  }
  if (moved) {
    addVisitedLocation();
  }
  return moved;
}

function* moveToNextPostionGenerator(): Generator<boolean> {
  yield movePacman('right');
  yield movePacman('left');
  yield movePacman('above');
}

function moveToNextPosition() {
  for (const move of moveToNextPostionGenerator()) {
    if (checkIfAtEndPosition()) return;
    if (move) {
      moveToNextPosition();
    } else {
      if (checkIfMoveable()) return;
    }
  }
}

moveToNextPosition();
