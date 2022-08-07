import { renderPositions } from '../helpers';
import { playingFieldStart, playingFieldStartWithTypeId, startPositions } from '../consts';
import { impossiblePositions } from './renderPositions.fixture';

describe('renderPositions', () => {
  it('should render a valid field with piece ids', () => {
    expect(JSON.stringify(renderPositions(startPositions, false))).toEqual(JSON.stringify(playingFieldStart));
  });
  it('should render a valid field with piece type ids', () => {
    expect(JSON.stringify(renderPositions(startPositions, true))).toEqual(JSON.stringify(playingFieldStartWithTypeId));
  });
  it('should return null for an invalid field', () => {
    expect(renderPositions(impossiblePositions)).toBeNull();
  });
});
