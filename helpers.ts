import { PlayingField, Position, PositionList, PositionListInfo } from './types';
import {
	BLOCK_SPACING,
	BLOCK_WIDTH,
	emptyPlayingField,
	PAUSE_BETWEEN_TWEENS,
	PLAYFIELD_HEIGHT,
	PLAYFIELD_WIDTH,
	randomColors,
	START_AND_END_PAUSE,
	TWEEN_STEPS,
} from './consts';
import { cloneDeep, padStart, pullAt } from 'lodash';
import fs from 'fs';
import canvasRenderer, { Canvas, CanvasContext } from 'canvas-renderer';

export function renderPositions(positions: PositionList, withTypId = false): PlayingField | null {
	const playingField = JSON.parse(JSON.stringify(emptyPlayingField));
	for (let i = 0; i < positions.length; i++) {
		const position = positions[i] as Position;
		for (let pieceRowIndex = 0; pieceRowIndex < position.piece.shape.length; pieceRowIndex++) {
			const pieceRow = position.piece.shape[pieceRowIndex] as number[];
			for (let pieceCelIndex = 0; pieceCelIndex < pieceRow.length; pieceCelIndex++) {
				if (
					playingField[position.positionY + pieceRowIndex][
						position.positionX + pieceCelIndex
					] === 0
				) {
					playingField[position.positionY + pieceRowIndex][
						position.positionX + pieceCelIndex
					] = withTypId ? position.piece.typeId : position.piece.id;
				} else {
					// Failed to place all pieces
					return null;
				}
			}
		}
	}
	return playingField;
}

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

export function getPieceIndexAtCoordinates(
	playground: PlayingField,
	positions: PositionList,
	coordX: number,
	coordY: number
): number | null {
	const pieceId = playground?.[coordY]?.[coordX];
	if (!pieceId) {
		return null; // Coordinates are outside the playfield
	}
	return positions.findIndex((position) => position.piece.id === pieceId) ?? null;
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
				const leftPieceIndex = getPieceIndexAtCoordinates(
					playfield,
					oldPositions,
					cellIndex - 1,
					rowIndex
				);
				if (leftPieceIndex !== null) {
					const positionWithSlideRightPiece = slideRight(leftPieceIndex, oldPositions);
					if (positionWithSlideRightPiece) {
						newPositions.push(positionWithSlideRightPiece);
					}
				}
				const rightPieceIndex = getPieceIndexAtCoordinates(
					playfield,
					oldPositions,
					cellIndex + 1,
					rowIndex
				);
				if (rightPieceIndex !== null) {
					const positionWithSlideLeftPiece = slideLeft(rightPieceIndex, oldPositions);
					if (positionWithSlideLeftPiece) {
						newPositions.push(positionWithSlideLeftPiece);
					}
				}
				const topPieceIndex = getPieceIndexAtCoordinates(
					playfield,
					oldPositions,
					cellIndex,
					rowIndex - 1
				);
				if (topPieceIndex !== null) {
					const positionWithSlideDownPiece = slideDown(topPieceIndex, oldPositions);
					if (positionWithSlideDownPiece) {
						newPositions.push(positionWithSlideDownPiece);
					}
				}
				const bottomPieceIndex = getPieceIndexAtCoordinates(
					playfield,
					oldPositions,
					cellIndex,
					rowIndex + 1
				);
				if (bottomPieceIndex !== null) {
					const positionWithSlideUpPiece = slideUp(bottomPieceIndex, oldPositions);
					if (positionWithSlideUpPiece) {
						newPositions.push(positionWithSlideUpPiece);
					}
				}
			}
		});
	});

	return newPositions;
}

export function isPositionEqual(position1: Position, position2: Position): boolean {
	return (
		position1.piece.type === position2.piece.type &&
		position1.positionX === position2.positionX &&
		position1.positionY === position2.positionY
	);
}

export function arePositionsEqual(positions1: PositionList, positions2: PositionList): boolean {
	return positions1.every((position1, positionIndex) => {
		return isPositionEqual(position1, positions2[positionIndex] as Position);
	});
}

export function generateKeyForPlayingField(positions: PositionList): string | null {
	const playfield = renderPositions(positions, true);
	if (!playfield) {
		return null;
	}
	return playfield.map((row) => row.join('|')).join('|');
}

export function logPositionsToString(positionsList: PositionList[]): string {
	return positionsList
		.map((positions) =>
			renderPositions(positions)
				?.map((row) => row.join('\t'))
				.join('\t|\t')
		)
		.join('\n');
}

export function findChangedPosition(
	lastStep: PositionListInfo,
	currentStep: PositionListInfo
): [Position, Position, Position[]] {
	const lastStepPositions = cloneDeep(lastStep.positions);
	const currentStepPositions = cloneDeep(currentStep.positions);
	const changedIndex = lastStep.positions.findIndex((position, positionIndex) => {
		return (
			position.positionX != currentStepPositions[positionIndex]?.positionX ||
			position.positionY != currentStepPositions[positionIndex]?.positionY
		);
	});

	return [
		pullAt(lastStepPositions, changedIndex)[0] as Position,
		pullAt(currentStepPositions, changedIndex)[0] as Position,
		currentStepPositions,
	];
}

function drawPosition(ctx: CanvasContext, position: Position) {
	ctx.fillStyle = randomColors[position.piece.typeId - 1] as string;
	ctx.fillRect(
		position.positionX * BLOCK_WIDTH + BLOCK_SPACING,
		position.positionY * BLOCK_WIDTH + BLOCK_SPACING,
		(position.piece.shape[0] as number[]).length * BLOCK_WIDTH - BLOCK_SPACING * 2,
		position.piece.shape.length * BLOCK_WIDTH - BLOCK_SPACING * 2
	);
}

function drawPositions(
	ctx: CanvasContext,
	playfieldWidth: number,
	playfieldHeight: number,
	positions: Position[]
): void {
	// Draw playing field
	ctx.fillStyle = '#999999';
	ctx.fillRect(0, 0, playfieldWidth, playfieldHeight);

	positions.forEach((position) => {
		drawPosition(ctx, position);
	});
}

export async function writeImageToFile(canvas: Canvas, frameCount: number): Promise<void> {
	return new Promise<void>(async (resolve, reject) => {
		const path = `./frames/frame-${padStart(String(frameCount), 4, '0')}.png`;
		// console.log('writing frame: ' + path);
		const image = fs.createWriteStream(path);
		image.write(canvas.toPng(), async (err) => {
			if (err) {
				reject(err);
			} else {
				image.close((err) => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			}
		});
	});
}

async function interpolateBetweenSteps(
	playfieldWidth: number,
	playfieldHeight: number,
	lastStep: PositionListInfo,
	currentStep: PositionListInfo,
	frameCount: number
): Promise<number> {
	let newFrameCount = frameCount;

	const [changedPositionLastStep, changePositionCurrentStep, unchangedPositions] =
		findChangedPosition(lastStep, currentStep);

	// Tween between previous and current step
	for (let tweenStep = 0; tweenStep < TWEEN_STEPS; tweenStep++) {
		const canvas = canvasRenderer.createCanvas(playfieldWidth, playfieldHeight);
		const ctx = canvas.getContext('2d');
		drawPositions(ctx, playfieldWidth, playfieldHeight, unchangedPositions);

		const position = cloneDeep(changePositionCurrentStep);
		if (changedPositionLastStep.positionX !== changePositionCurrentStep.positionX) {
			position.positionX =
				changedPositionLastStep.positionX +
				((changePositionCurrentStep.positionX - changedPositionLastStep.positionX) *
					tweenStep) /
					TWEEN_STEPS;
		}
		if (changedPositionLastStep.positionY !== changePositionCurrentStep.positionY) {
			position.positionY =
				changedPositionLastStep.positionY +
				((changePositionCurrentStep.positionY - changedPositionLastStep.positionY) *
					tweenStep) /
					TWEEN_STEPS;
		}
		drawPosition(ctx, position);

		await writeImageToFile(canvas, newFrameCount);
		newFrameCount++;
	}

	// Add a pause between tweens
	const canvas = canvasRenderer.createCanvas(playfieldWidth, playfieldHeight);
	const ctx = canvas.getContext('2d');
	drawPositions(ctx, playfieldWidth, playfieldHeight, currentStep.positions);
	for (let i = 0; i < PAUSE_BETWEEN_TWEENS; i++) {
		await writeImageToFile(canvas, newFrameCount);
		newFrameCount++;
	}

	return newFrameCount;
}

export async function drawFrames(trail: PositionListInfo[]) {
	try {
		fs.mkdirSync('./frames', { recursive: true });
	} catch (e) {
		// ignore if already exists
	}
	const playfield = renderPositions((trail[0] as PositionListInfo).positions);
	if (!playfield) {
		console.log('playfield for first step in solution path is not valid');
		return;
	}
	const playfieldWidth: number = (playfield[0] as number[]).length * BLOCK_WIDTH;
	const playfieldHeight: number = playfield.length * BLOCK_WIDTH;
	let frameCount = 0;

	// Draw first position a few frames
	const canvas = canvasRenderer.createCanvas(playfieldWidth, playfieldHeight);
	const ctx = canvas.getContext('2d');
	drawPositions(ctx, playfieldWidth, playfieldHeight, (trail[0] as PositionListInfo).positions);
	for (let i = 0; i < START_AND_END_PAUSE; i++) {
		await writeImageToFile(canvas, frameCount);
		frameCount++;
	}

	// Draw animation between the positions
	for (let stepIndex = 0; stepIndex < trail.length; stepIndex++) {
		const step = trail[stepIndex];
		// if (stepIndex > 20) {
		// 	return;
		// }
		const lastStep = trail?.[stepIndex - 1];
		if (lastStep) {
			console.log('generating frames for step: ' + stepIndex);
			frameCount = await interpolateBetweenSteps(
				playfieldWidth,
				playfieldHeight,
				lastStep,
				step as PositionListInfo,
				frameCount
			);
		}
	}

	// Draw ending position a few times
	if (START_AND_END_PAUSE > PAUSE_BETWEEN_TWEENS) {
		drawPositions(
			ctx,
			playfieldWidth,
			playfieldHeight,
			(trail[0] as PositionListInfo).positions
		);
		for (let i = 0; i < START_AND_END_PAUSE - PAUSE_BETWEEN_TWEENS; i++) {
			await writeImageToFile(canvas, frameCount);
			frameCount++;
		}
	}

	console.log('finished generating frames.', frameCount);
}
