import { PlayingField, Position, PositionList } from './types';
import { emptyPlayingField, PLAYFIELD_HEIGHT, PLAYFIELD_WIDTH } from './consts';
import { cloneDeep, uniqWith } from 'lodash';

export function renderPositions(positions: PositionList): PlayingField | null {
  const playingField = JSON.parse(JSON.stringify(emptyPlayingField));
  for (let i = 0; i < positions.length; i++) {
    const position = positions[i] as Position;
    for (let pieceRowIndex = 0; pieceRowIndex < position.piece.shape.length; pieceRowIndex++) {
      const pieceRow = position.piece.shape[pieceRowIndex] as number[];
      for (let pieceCelIndex = 0; pieceCelIndex < pieceRow.length; pieceCelIndex++) {
        const pieceCel = pieceRow[pieceCelIndex];
        if (playingField[position.positionY + pieceRowIndex][position.positionX + pieceCelIndex] === 0) {
          playingField[position.positionY + pieceRowIndex][position.positionX + pieceCelIndex] = pieceCel;
        } else {
          // Failed to place all pieces
          return null;
        }
      }
    }
  }
  return playingField;
}

// export function clonePosition(position: Position): Position {
//   return {
//     ...position,
//     piece: {...position.piece} // No need to deep clone the whole piece since we never modify its shape
//   }
// }

export function clonePositions(positions: PositionList): PositionList {
  return cloneDeep(positions);
}

export function slideDown(positionIndex: number, oldPositions: PositionList): PositionList | null {
  const newPositions = clonePositions(oldPositions);
  const position = newPositions[positionIndex] as Position;
  position.positionY += 1;
  if (position.positionY + position.piece.shape.length - 1 >= PLAYFIELD_HEIGHT) {
    return null; // Piece goes off the playing field
  }

  return newPositions;
}

export function slideUp(positionIndex: number, oldPositions: PositionList): PositionList | null {
  const newPositions = clonePositions(oldPositions);
  const position = newPositions[positionIndex] as Position;
  position.positionY -= 1;
  if (position.positionY < 0) {
    return null; // Piece goes off the playing field
  }

  return newPositions;
}

export function slideLeft(positionIndex: number, oldPositions: PositionList): PositionList | null {
  const newPositions = clonePositions(oldPositions);
  const position = newPositions[positionIndex] as Position;
  position.positionX -= 1;
  if (position.positionX < 0) {
    return null; // Piece goes off the playing field
  }

  return newPositions;
}

export function slideRight(positionIndex: number, oldPositions: PositionList): PositionList | null {
  const newPositions = clonePositions(oldPositions);
  const position = newPositions[positionIndex] as Position;
  position.positionX += 1;
  if (position.positionX + (position.piece.shape[0] as number[]).length - 1 > PLAYFIELD_WIDTH) {
    return null; // Piece goes off the playing field
  }

  return newPositions;
}

export function getPieceIndexAtCoordinates(playground: PlayingField, positions: PositionList, coordX: number, coordY: number): number | null {
  const pieceId = playground?.[coordY]?.[coordX];
  if (!pieceId) {
    return null; // Coordinates are outside the playfield
  }
  return positions.findIndex(position => position.piece.id === pieceId) ?? null;
}

export function generateNewPositions(oldPositions: PositionList): PositionList[] {
  const newPositions: PositionList[] = [];

  const playfield = renderPositions(oldPositions);

  if (!playfield) {
    return []; // oldPositions are not valid, since 2 pieces overlap or go out of the playing field bound
  }

  playfield.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === 0) {
        // Found empty cell
        const leftPieceIndex = getPieceIndexAtCoordinates(playfield, oldPositions, cellIndex - 1, rowIndex);
        if (leftPieceIndex !== null) {
          const positionWithSlideRightPiece = slideRight(leftPieceIndex, oldPositions);
          if (positionWithSlideRightPiece) {
            newPositions.push(positionWithSlideRightPiece);
          }
        }
        const rightPieceIndex = getPieceIndexAtCoordinates(playfield, oldPositions, cellIndex + 1, rowIndex);
        if (rightPieceIndex !== null) {
          const positionWithSlideLeftPiece = slideLeft(rightPieceIndex, oldPositions);
          if (positionWithSlideLeftPiece) {
            newPositions.push(positionWithSlideLeftPiece);
          }
        }
        const topPieceIndex = getPieceIndexAtCoordinates(playfield, oldPositions, cellIndex, rowIndex - 1);
        if (topPieceIndex !== null) {
          const positionWithSlideDownPiece = slideDown(topPieceIndex, oldPositions)
          if (positionWithSlideDownPiece) {
            newPositions.push(positionWithSlideDownPiece);
          }
        }
        const bottomPieceIndex = getPieceIndexAtCoordinates(playfield, oldPositions, cellIndex, rowIndex + 1);
        if (bottomPieceIndex !== null) {
          const positionWithSlideUpPiece = slideUp(bottomPieceIndex, oldPositions);
          if (positionWithSlideUpPiece) {
            newPositions.push(positionWithSlideUpPiece);
          }
        }
      }
    })
  })

  return uniqWith(newPositions, arePositionsEqual);
}

export function isPositionEqual(position1: Position, position2: Position): boolean {
  return position1.piece.type === position2.piece.type && position1.positionX === position2.positionX && position1.positionY === position2.positionY;
}

export function arePositionsEqual(positions1: PositionList, positions2: PositionList): boolean {
  return positions1.every((position1, positionIndex) => {
    return isPositionEqual(position1, positions2[positionIndex] as Position);
  })
}


export function logPositionsToString(positionsList: PositionList[]): string {
  return positionsList.map(positions => renderPositions(positions)?.map(row => row.join('\t')).join('\t|\t')).join('\n');
}
