export type PieceShape = number[][];

export enum PieceType {
  SQUARE = "SQUARE",
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
  SINGLE = "SINGLE",
}

export enum PieceName {
  SQUARE = "SQUARE",
  VERTICAL1 = "VERTICAL1",
  VERTICAL2 = "VERTICAL2",
  VERTICAL3 = "VERTICAL3",
  VERTICAL4 = "VERTICAL4",
  HORIZONTAL = "HORIZONTAL",
  SINGLE1 = "SINGLE1",
  SINGLE2 = "SINGLE2",
  SINGLE3 = "SINGLE3",
  SINGLE4 = "SINGLE4",
}

export interface Piece {
  shape: PieceShape;
  id: number;
  type: PieceType;
  typeId: 1 | 2 | 3 | 4;
}

export type PlayingField = number[][];

export interface Position {
  piece: Piece;
  positionX: number;
  positionY: number;
}

export type PositionList = [Position, Position, Position, Position, Position, Position, Position, Position, Position, Position]; // A position list always has 10 pieces

export type PositionListInfo = {
  positions: PositionList
  parentPlayfieldKey: string | null;
}
