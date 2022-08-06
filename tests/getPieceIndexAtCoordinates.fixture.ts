import { PieceType, PlayingField, PositionList } from '../types';

export const getPiecePlayfield: PlayingField = [
  [2, 1, 1, 0],
  [2, 1, 1, 0],
  [4, 7, 5, 3],
  [4, 9, 5, 3],
  [8, 10, 6, 6]
];

export const getPiecePositions: PositionList = [
  {
    "piece": {
      "shape": [
        [
          1,
          1
        ],
        [
          1,
          1
        ]
      ],
      "type": PieceType.SQUARE,
      "id": 1
    },
    "positionX": 1,
    "positionY": 0
  },
  {
    "piece": {
      "shape": [
        [
          2
        ],
        [
          2
        ]
      ],
      "type": PieceType.VERTICAL,
      "id": 2
    },
    "positionX": 0,
    "positionY": 0
  },
  {
    "piece": {
      "shape": [
        [
          3
        ],
        [
          3
        ]
      ],
      "type": PieceType.VERTICAL,
      "id": 3
    },
    "positionX": 3,
    "positionY": 2
  },
  {
    "piece": {
      "shape": [
        [
          4
        ],
        [
          4
        ]
      ],
      "type": PieceType.VERTICAL,
      "id": 4
    },
    "positionX": 0,
    "positionY": 2
  },
  {
    "piece": {
      "shape": [
        [
          5
        ],
        [
          5
        ]
      ],
      "type": PieceType.VERTICAL,
      "id": 5
    },
    "positionX": 2,
    "positionY": 2
  },
  {
    "piece": {
      "shape": [
        [
          6,
          6
        ]
      ],
      "type": PieceType.HORIZONTAL,
      "id": 6
    },
    "positionX": 2,
    "positionY": 4
  },
  {
    "piece": {
      "shape": [
        [
          7
        ]
      ],
      "type": PieceType.SINGLE,
      "id": 7
    },
    "positionX": 1,
    "positionY": 2
  },
  {
    "piece": {
      "shape": [
        [
          8
        ]
      ],
      "type": PieceType.SINGLE,
      "id": 8
    },
    "positionX": 0,
    "positionY": 4
  },
  {
    "piece": {
      "shape": [
        [
          9
        ]
      ],
      "type": PieceType.SINGLE,
      "id": 9
    },
    "positionX": 1,
    "positionY": 3
  },
  {
    "piece": {
      "shape": [
        [
          10
        ]
      ],
      "type": PieceType.SINGLE,
      "id": 10
    },
    "positionX": 1,
    "positionY": 4
  }
];
