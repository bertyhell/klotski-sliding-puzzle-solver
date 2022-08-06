import { getPieceIndexAtCoordinates } from '../helpers';
import { getPiecePlayfield, getPiecePositions } from './getPieceIndexAtCoordinates.fixture';
import { PieceType } from '../types';

describe('getPieceIndexAtCoordinates', () => {
  it('should return the square piece index', () => {
    const pieceIndex = getPieceIndexAtCoordinates(getPiecePlayfield, getPiecePositions, 2, 0);
    expect(pieceIndex).not.toBeNull();
    expect(getPiecePositions?.[pieceIndex as number]?.piece?.type).toEqual(PieceType.SQUARE);
  })
})
