const packman = require('../dist/index.js');

describe('Pacman', () => {
  it('can go all directions', () => {
    packman.currentPosition.x = 4;
    packman.currentPosition.y = 4;
    packman.goRight();
    expect(packman.currentPosition.x).toBe(5);
    packman.goLeft();
    expect(packman.currentPosition.x).toBe(4);
    packman.goAbove();
    expect(packman.currentPosition.y).toBe(5);
  });
  it('checks if it is able to move', () => {
    packman.currentPosition.x = 4;
    expect(packman.checkIfPossibleToMoveRight()).toBe(true);
    packman.currentPosition.x = 5;
    expect(packman.checkIfPossibleToMoveRight()).toBe(false);

    packman.currentPosition.x = 1;
    expect(packman.checkIfPossibleToMoveLeft()).toBe(true);
    packman.currentPosition.x = 0;
    expect(packman.checkIfPossibleToMoveLeft()).toBe(false);
  });
  it.todo('can pop off');
});
