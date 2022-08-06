import { pieces } from '../consts';
import { PositionList } from '../types';

export const impossiblePositions = [
  {
    piece: pieces.SQUARE,
    positionX: 0,
    positionY: 0
  }, {
    piece: pieces.VERTICAL1,
    positionX: 1,
    positionY: 1
  }
] as unknown as PositionList;
