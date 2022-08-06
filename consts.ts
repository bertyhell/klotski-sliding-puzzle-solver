import { Piece, PieceName, PieceType, PlayingField, Position, PositionList } from './types';

export const PLAYFIELD_WIDTH = 4;
export const PLAYFIELD_HEIGHT = 5;

export const pieces: Record<PieceName, Piece> = {
  SQUARE: {
    shape: [
      [1, 1],
      [1, 1
      ]
    ],
    type: PieceType.SQUARE,
    id: 1
  },
  VERTICAL1: {
    shape: [
      [2],
      [2]
    ],
    type: PieceType.VERTICAL,
    id: 2
  },
  VERTICAL2: {
    shape: [
      [3],
      [3]
    ],
    type: PieceType.VERTICAL,
    id: 3
  },
  VERTICAL3: {
    shape: [
      [4],
      [4]
    ],
    type: PieceType.VERTICAL,
    id: 4
  },
  VERTICAL4: {
    shape: [
      [5],
      [5]
    ],
    type: PieceType.VERTICAL,
    id: 5
  },
  HORIZONTAL: {
    shape: [
      [6, 6]
    ],
    type: PieceType.HORIZONTAL,
    id: 6
  },
  SINGLE1: {
    shape: [
      [7]
    ],
    type: PieceType.SINGLE,
    id: 7
  },
  SINGLE2: {
    shape: [
      [8]
    ],
    type: PieceType.SINGLE,
    id: 8
  },
  SINGLE3: {
    shape: [
      [9]
    ],
    type: PieceType.SINGLE,
    id: 9
  },
  SINGLE4: {
    shape: [
      [10]
    ],
    type: PieceType.SINGLE,
    id: 10
  }
}

export const emptyPlayingField: PlayingField = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

export const playingFieldStart: PlayingField = [
  [2, 1, 1, 3],
  [2, 1, 1, 3],
  [0, 6, 6, 0],
  [4, 7, 9, 5],
  [4, 8, 10, 5]
];

export const endPosition: Position = {
  piece: pieces.SQUARE,
  positionX: 1,
  positionY: 3
}

export const startPositions: PositionList = [
  {
    piece: pieces.SQUARE,
    positionX: 1,
    positionY: 0
  }, {
    piece: pieces.VERTICAL1,
    positionX: 0,
    positionY: 0
  }, {
    piece: pieces.VERTICAL2,
    positionX: 3,
    positionY: 0
  }, {
    piece: pieces.VERTICAL3,
    positionX: 0,
    positionY: 3
  }, {
    piece: pieces.VERTICAL4,
    positionX: 3,
    positionY: 3
  }, {
    piece: pieces.HORIZONTAL,
    positionX: 1,
    positionY: 2
  }, {
    piece: pieces.SINGLE1,
    positionX: 1,
    positionY: 3
  }, {
    piece: pieces.SINGLE2,
    positionX: 1,
    positionY: 4
  }, {
    piece: pieces.SINGLE3,
    positionX: 2,
    positionY: 3
  }, {
    piece: pieces.SINGLE4,
    positionX: 2,
    positionY: 4
  }
];
