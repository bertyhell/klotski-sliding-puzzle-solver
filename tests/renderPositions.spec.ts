import { renderPositions } from '../helpers';
import { playingFieldStart, startPositions } from '../consts';
import { impossiblePositions } from './renderPositions.fixture';

describe('renderPositions', () => {
  it('should render a valid field', () => {
    expect(JSON.stringify(renderPositions(startPositions))).toEqual(JSON.stringify(playingFieldStart));
  });
  it('should return null for an invalid field', () => {
    expect(renderPositions(impossiblePositions)).toBeNull();
  });
});
