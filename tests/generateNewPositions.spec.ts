import { generateNewPositions, getPieceIndexAtCoordinates, logPositionsToString, renderPositions } from '../helpers';
import { squarePieceRightPlayfield } from './generateNewPositions.fixture';
import { PieceType } from '../types';

describe('generateNewPositions', () => {
  it('should generate all possible positions for a playing field', () => {
    // We'll see if the function proposes a possible positions list where the square (1) piece has slid to the right
    // input:
    //  2  1  1  0
    //  2  1  1  0
    //  4  7  5  3
    //  4  9  5  3
    //  8  10  6  6
    //
    // expected output:
    //  2  0  1  1
    //  2  0  1  1
    //  4  7  5  3
    //  4  9  5  3
    //  8  10  6  6
    const newPossiblePositions = generateNewPositions(squarePieceRightPlayfield);

    console.log('new positions:\n\n' + logPositionsToString(newPossiblePositions));

    expect(newPossiblePositions.find((positions) => {
      const playfield = renderPositions(positions);
      if (!playfield) {
        return;
      }
      const pieceIndex = getPieceIndexAtCoordinates(playfield, positions, 3, 0);
      // We expect one of the new possibilities to be the square piece on the top right side of the playing field
      return pieceIndex !== null && positions[pieceIndex]?.piece?.type === PieceType.SQUARE;
    })).toBeDefined();
  });
});
