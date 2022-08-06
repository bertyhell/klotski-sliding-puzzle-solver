import { arePositionsEqual, clonePositions, logPositionsToString } from '../helpers';
import { startPositions } from '../consts';

describe('arePositionsEqual', () => {
  it('should mark positions that are equal as equal', () => {
    expect(arePositionsEqual(startPositions, startPositions)).toBeTruthy();
  });

  it('should mark positions that are not equal as not equal', () => {
    const otherPositions = clonePositions(startPositions);
    otherPositions[1].positionY = 1;
    expect(arePositionsEqual(startPositions, otherPositions)).toBeFalsy();
  });

  it('should mark positions that are equal as equal even for 2 different pieces of the same type', () => {
    const otherPositions = clonePositions(startPositions);

    // Swap 2 pieces of the same shape
    const tempPiece = otherPositions[1].piece;
    otherPositions[1].piece = otherPositions[2].piece;
    otherPositions[2].piece = tempPiece;

    console.log(logPositionsToString([startPositions, otherPositions]));

    expect(arePositionsEqual(startPositions, otherPositions)).toBeTruthy();
  });
});
