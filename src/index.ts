/* class FindEveryWay {
  maxPostion = {
    x: 5,
    y: 5,
  };
  startPosition = {
    x: 3,
    y: 0,
  };
  endPosition = {
    x: 3,
    y: 5,
  };
  currentPosition = {
    x: 3,
    y: 0,
  };
  goRight() {
    return (this.currentPosition.x += 1);
  }
  goLeft() {
    return (this.currentPosition.x -= 1);
  }
  goAbove() {
    return (this.currentPosition.y += 1);
  }
  checkIfAtStart() {
    const checkX = this.currentPosition.x == this.startPosition.x;
    const checkY = this.currentPosition.y == this.startPosition.y;
    return checkX && checkY;
  }
  checkIfAtEnd() {
    const checkX = this.currentPosition.x == this.endPosition.x;
    const checkY = this.currentPosition.y == this.endPosition.y;
    return checkX && checkY;
  }
  checkIfPossibleToMoveRight() {
    return this.currentPosition.x + 1 <= this.maxPostion.x;
  }
  checkIfPossibleToMoveLeft() {
    return this.currentPosition.x - 1 >= 0;
  }
  checkIfPossibleToMoveAbove() {
    return this.currentPosition.x + 1 <= this.maxPostion.x;
  }
  checkIfPossibleToMove() {
    const checkIfAtStart = this.checkIfAtStart();
    const checkIfAtEnd = this.checkIfAtEnd();
  }
  moveOptions = [this.goRight, this.goLeft, this.goAbove];
  constructor() {}
} */

const maxPostion = {
  x: 5,
  y: 5,
};

const startPosition = {
  x: 3,
  y: 0,
};

const endPosition = {
  x: 3,
  y: 5,
};

const currentPosition = {
  x: 3,
  y: 0,
};

function goRight() {
  currentPosition.x += 1;
}

function goLeft() {
  currentPosition.x -= 1;
}

function goAbove() {
  currentPosition.y += 1;
}

function checkIfAtStartPosition() {
  const checkX = currentPosition.x == startPosition.x;
  const checkY = currentPosition.y == startPosition.y;
  return checkX && checkY;
}

function checkIfAtEndPosition() {
  const checkX = currentPosition.x == endPosition.x;
  const checkY = currentPosition.y == endPosition.y;
  return checkX && checkY;
}

function checkIfPossibleToMoveRight() {
  return currentPosition.x + 1 <= maxPostion.x;
}

function checkIfPossibleToMoveLeft() {
  return currentPosition.x - 1 >= 0;
}

function checkIfPossibleToMoveAbove() {
  return currentPosition.x + 1 <= maxPostion.x;
}

function* moveToNextPostionGenerator() {
  if (!checkIfPossibleToMoveRight()) yield false;
  goRight();
  yield true;
  if (checkIfPossibleToMoveLeft()) yield false;
  goLeft();
  yield true;
  if (checkIfPossibleToMoveAbove()) yield false;
  goAbove();
  yield true;
}

function moveToNextPosition() {
  for (const move of moveToNextPostionGenerator()) {
    if (checkIfAtEndPosition()) return;
    if (!move) continue;
    moveToNextPosition();
  }
}

moveToNextPosition();
