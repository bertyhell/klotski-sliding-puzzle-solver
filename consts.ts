import { Piece, PieceName, PieceType, PlayingField, Position, PositionList } from './types';

export const PLAYFIELD_WIDTH = 4;
export const PLAYFIELD_HEIGHT = 5;
export const BLOCK_WIDTH = 200;
export const BLOCK_SPACING = 5;
export const TWEEN_STEPS = 40;
export const PAUSE_BETWEEN_TWEENS = 20;
export const START_AND_END_PAUSE = 120;
export const randomColors = ['#e0220d', '#8a4e1f', '#8a4e1f', '#8a4e1f'];

export const pieces: Record<PieceName, Piece> = {
	SQUARE: {
		shape: [
			[1, 1],
			[1, 1],
		],
		type: PieceType.SQUARE,
		id: 1,
		typeId: 1,
	},
	VERTICAL1: {
		shape: [[2], [2]],
		type: PieceType.VERTICAL,
		id: 2,
		typeId: 2,
	},
	VERTICAL2: {
		shape: [[3], [3]],
		type: PieceType.VERTICAL,
		id: 3,
		typeId: 2,
	},
	VERTICAL3: {
		shape: [[4], [4]],
		type: PieceType.VERTICAL,
		id: 4,
		typeId: 2,
	},
	VERTICAL4: {
		shape: [[5], [5]],
		type: PieceType.VERTICAL,
		id: 5,
		typeId: 2,
	},
	HORIZONTAL: {
		shape: [[6, 6]],
		type: PieceType.HORIZONTAL,
		id: 6,
		typeId: 3,
	},
	SINGLE1: {
		shape: [[7]],
		type: PieceType.SINGLE,
		id: 7,
		typeId: 4,
	},
	SINGLE2: {
		shape: [[8]],
		type: PieceType.SINGLE,
		id: 8,
		typeId: 4,
	},
	SINGLE3: {
		shape: [[9]],
		type: PieceType.SINGLE,
		id: 9,
		typeId: 4,
	},
	SINGLE4: {
		shape: [[10]],
		type: PieceType.SINGLE,
		id: 10,
		typeId: 4,
	},
};

export const emptyPlayingField: PlayingField = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
];

export const playingFieldStart: PlayingField = [
	[2, 1, 1, 3],
	[2, 1, 1, 3],
	[0, 6, 6, 0],
	[4, 7, 9, 5],
	[4, 8, 10, 5],
];

export const playingFieldStartWithTypeId: PlayingField = [
	[2, 1, 1, 2],
	[2, 1, 1, 2],
	[0, 3, 3, 0],
	[2, 4, 4, 2],
	[2, 4, 4, 2],
];

export const endPosition: Position = {
	piece: pieces.SQUARE,
	positionX: 1,
	positionY: 3,
};

export const startPositions: PositionList = [
	{
		piece: pieces.SQUARE,
		positionX: 1,
		positionY: 0,
	},
	{
		piece: pieces.VERTICAL1,
		positionX: 0,
		positionY: 0,
	},
	{
		piece: pieces.VERTICAL2,
		positionX: 3,
		positionY: 0,
	},
	{
		piece: pieces.VERTICAL3,
		positionX: 0,
		positionY: 3,
	},
	{
		piece: pieces.VERTICAL4,
		positionX: 3,
		positionY: 3,
	},
	{
		piece: pieces.HORIZONTAL,
		positionX: 1,
		positionY: 2,
	},
	{
		piece: pieces.SINGLE1,
		positionX: 1,
		positionY: 3,
	},
	{
		piece: pieces.SINGLE2,
		positionX: 1,
		positionY: 4,
	},
	{
		piece: pieces.SINGLE3,
		positionX: 2,
		positionY: 3,
	},
	{
		piece: pieces.SINGLE4,
		positionX: 2,
		positionY: 4,
	},
];
