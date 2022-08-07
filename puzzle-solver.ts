import * as fs from 'fs';
import { Position, PositionListInfo } from './types';
import { endPosition, startPositions } from './consts';
import {
	drawFrames,
	generateKeyForPlayingField,
	generateNewPositions,
	isPositionEqual,
	logPositionsToString,
	renderPositions,
} from './helpers';

/**
 * Find all valid positions with sliding
 */
function findSolution(): PositionListInfo[] | null {
	const positionListsToCheck: PositionListInfo[] = [
		{ positions: startPositions, parentPlayfieldKey: null },
	];
	const seenPositionLists: Record<string, PositionListInfo> = {
		[generateKeyForPlayingField(startPositions) as string]:
			positionListsToCheck[0] as PositionListInfo,
	};
	let seenPositionListLength = 0;
	let solvedPositionListInfo: PositionListInfo | null = null;
	let seenPositionsOnLastLog = 0;
	let positionsToCheckOnLastLog = 1;

	// Run through all possible positions, until you find no more or until we found the winning position
	while (positionListsToCheck.length > 0 && solvedPositionListInfo === null) {
		const nextPositionsToCheck = positionListsToCheck.shift() as PositionListInfo;

		// Log progress to console after every 1000 found possibilities
		if (Math.floor(seenPositionListLength / 1000) !== seenPositionsOnLastLog) {
			console.log(
				'checking position: ',
				positionListsToCheck.length,
				seenPositionListLength,
				positionListsToCheck.length - positionsToCheckOnLastLog
			);
			seenPositionsOnLastLog = Math.floor(seenPositionListLength / 1000);
			positionsToCheckOnLastLog = positionListsToCheck.length;
		}

		// Check if done
		const squarePiecePosition = nextPositionsToCheck.positions[0] as Position; // Square piece is always the first position in the list
		if (isPositionEqual(squarePiecePosition, endPosition)) {
			// Found ending position
			solvedPositionListInfo = nextPositionsToCheck;
		}

		// Keep finding new positions
		const newPossiblePositionsList = generateNewPositions(nextPositionsToCheck.positions);
		newPossiblePositionsList.forEach((newPossiblePositionList) => {
			// Check if piece do not overlap
			if (renderPositions(newPossiblePositionList)) {
				// Check if we haven't seen this positions before
				if (
					!seenPositionLists[
						generateKeyForPlayingField(newPossiblePositionList) as string
					]
				) {
					const newPossiblePositionListInfo: PositionListInfo = {
						positions: newPossiblePositionList,
						parentPlayfieldKey: generateKeyForPlayingField(
							nextPositionsToCheck.positions
						),
					};
					positionListsToCheck.push(newPossiblePositionListInfo);
					const playfieldKey = generateKeyForPlayingField(newPossiblePositionList);
					if (playfieldKey) {
						seenPositionLists[playfieldKey] = newPossiblePositionListInfo;
						seenPositionListLength++;
					}
				}
			}
		});
	}

	fs.writeFileSync(
		'./seen-positions.txt',
		logPositionsToString(Object.values(seenPositionLists).map((item) => item.positions))
	);

	// Find chain of positions that lead to the solved positions
	if (solvedPositionListInfo) {
		const solutionTrail: PositionListInfo[] = [solvedPositionListInfo];
		let step: PositionListInfo = solvedPositionListInfo;
		while (step.parentPlayfieldKey !== null) {
			step = seenPositionLists[step.parentPlayfieldKey] as PositionListInfo;
			solutionTrail.unshift(step);
		}

		return solutionTrail;
	} else {
		return null; // Solution not found
	}
}
const USE_SOLUTION_TRAIL_CACHE = true;
if (!USE_SOLUTION_TRAIL_CACHE) {
	const solutionTrail = findSolution();
	if (solutionTrail) {
		fs.writeFileSync(
			'./solution-trail.txt',
			logPositionsToString(solutionTrail.map((step) => step.positions))
		);
		fs.writeFileSync('./solution-trail.json', JSON.stringify(solutionTrail));

		console.log('solution trail written to ./solution-trail.txt');

		console.log('drawing frames:');
		drawFrames(solutionTrail);
	} else {
		console.log('no solution was found');
	}
} else {
	const solutionTrail = JSON.parse(fs.readFileSync('./solution-trail.json').toString('utf-8'));

	console.log('drawing frames:');
	drawFrames(solutionTrail);
}
