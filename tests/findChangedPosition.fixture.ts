import { PieceType, PositionListInfo } from '../types';

export const lastStepFixture: PositionListInfo = {
	positions: [
		{
			piece: {
				shape: [
					[1, 1],
					[1, 1],
				],
				type: PieceType.SQUARE,
				id: 1,
				typeId: 1,
			},
			positionX: 1,
			positionY: 0,
		},
		{
			piece: {
				shape: [[2], [2]],
				type: PieceType.VERTICAL,
				id: 2,
				typeId: 2,
			},
			positionX: 0,
			positionY: 0,
		},
		{
			piece: {
				shape: [[3], [3]],
				type: PieceType.VERTICAL,
				id: 3,
				typeId: 2,
			},
			positionX: 3,
			positionY: 0,
		},
		{
			piece: {
				shape: [[4], [4]],
				type: PieceType.VERTICAL,
				id: 4,
				typeId: 2,
			},
			positionX: 0,
			positionY: 3,
		},
		{
			piece: {
				shape: [[5], [5]],
				type: PieceType.VERTICAL,
				id: 5,
				typeId: 2,
			},
			positionX: 3,
			positionY: 3,
		},
		{
			piece: {
				shape: [[6, 6]],
				type: PieceType.HORIZONTAL,
				id: 6,
				typeId: 3,
			},
			positionX: 1,
			positionY: 2,
		},
		{
			piece: {
				shape: [[7]],
				type: PieceType.SINGLE,
				id: 7,
				typeId: 4,
			},
			positionX: 1,
			positionY: 3,
		},
		{
			piece: {
				shape: [[8]],
				type: PieceType.SINGLE,
				id: 8,
				typeId: 4,
			},
			positionX: 1,
			positionY: 4,
		},
		{
			piece: {
				shape: [[9]],
				type: PieceType.SINGLE,
				id: 9,
				typeId: 4,
			},
			positionX: 2,
			positionY: 3,
		},
		{
			piece: {
				shape: [[10]],
				type: PieceType.SINGLE,
				id: 10,
				typeId: 4,
			},
			positionX: 2,
			positionY: 4,
		},
	],
	parentPlayfieldKey: null,
};

export const currentStepFixture: PositionListInfo = {
	positions: [
		{
			piece: {
				shape: [
					[1, 1],
					[1, 1],
				],
				type: PieceType.SQUARE,
				id: 1,
				typeId: 1,
			},
			positionX: 1,
			positionY: 0,
		},
		{
			piece: {
				shape: [[2], [2]],
				type: PieceType.VERTICAL,
				id: 2,
				typeId: 2,
			},
			positionX: 0,
			positionY: 0,
		},
		{
			piece: {
				shape: [[3], [3]],
				type: PieceType.VERTICAL,
				id: 3,
				typeId: 2,
			},
			positionX: 3,
			positionY: 0,
		},
		{
			piece: {
				shape: [[4], [4]],
				type: PieceType.VERTICAL,
				id: 4,
				typeId: 2,
			},
			positionX: 0,
			positionY: 3,
		},
		{
			piece: {
				shape: [[5], [5]],
				type: PieceType.VERTICAL,
				id: 5,
				typeId: 2,
			},
			positionX: 3,
			positionY: 3,
		},
		{
			piece: {
				shape: [[6, 6]],
				type: PieceType.HORIZONTAL,
				id: 6,
				typeId: 3,
			},
			positionX: 0,
			positionY: 2,
		},
		{
			piece: {
				shape: [[7]],
				type: PieceType.SINGLE,
				id: 7,
				typeId: 4,
			},
			positionX: 1,
			positionY: 3,
		},
		{
			piece: {
				shape: [[8]],
				type: PieceType.SINGLE,
				id: 8,
				typeId: 4,
			},
			positionX: 1,
			positionY: 4,
		},
		{
			piece: {
				shape: [[9]],
				type: PieceType.SINGLE,
				id: 9,
				typeId: 4,
			},
			positionX: 2,
			positionY: 3,
		},
		{
			piece: {
				shape: [[10]],
				type: PieceType.SINGLE,
				id: 10,
				typeId: 4,
			},
			positionX: 2,
			positionY: 4,
		},
	],
	parentPlayfieldKey: '2|1|1|2|2|1|1|2|0|3|3|0|2|4|4|2|2|4|4|2',
};
