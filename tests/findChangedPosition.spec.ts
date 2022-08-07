import { findChangedPosition } from '../helpers';
import { currentStepFixture, lastStepFixture } from './findChangedPosition.fixture';
import { PieceType } from '../types';

describe('findChangedPosition', () => {
	it('should identify the changed position', () => {
		const [changedPositionLastStep, changePositionCurrentStep, unchangedPositions] =
			findChangedPosition(lastStepFixture, currentStepFixture);
		expect(changedPositionLastStep).toEqual(
			lastStepFixture.positions.find((p) => p.piece.type === PieceType.HORIZONTAL)
		);
		expect(changePositionCurrentStep).toEqual(
			currentStepFixture.positions.find((p) => p.piece.type === PieceType.HORIZONTAL)
		);
		expect(unchangedPositions).toHaveLength(lastStepFixture.positions.length - 1);
		expect(
			unchangedPositions.find((p) => p.piece.type === PieceType.HORIZONTAL)
		).toBeUndefined();
	});
});
