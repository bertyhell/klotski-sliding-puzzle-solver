import * as fs from 'fs';
import { Position, PositionList, PositionListInfo } from './types';
import { endPosition, startPositions } from './consts';
import { arePositionsEqual, generateNewPositions, isPositionEqual, logPositionsToString, renderPositions } from './helpers';

/**
 * Find all valid positions with sliding
 */
function findSolution() {
  const positionListsToCheck: PositionListInfo[] = [{ positions: startPositions, parentPositionListIndex: -1 }];
  const seenPositionLists: PositionListInfo[] = [];
  let solvedPositionListInfo: PositionListInfo | null = null;
  let seenPositionsOnLastLog = 0;
  let positionsToCheckOnLastLog = 1;

  // Run through all possible positions, until you find no more or until we found the winning position
  while (positionListsToCheck.length > 0 && solvedPositionListInfo === null && seenPositionLists.length < 10000) {
    const nextPositionsToCheck = positionListsToCheck.shift() as PositionListInfo;

    // Log progress to console after every 1000 found possibilities
    if (Math.floor(seenPositionLists.length / 1000) !== seenPositionsOnLastLog) {
      console.log('checking position: ', positionListsToCheck.length, seenPositionLists.length, positionListsToCheck.length - positionsToCheckOnLastLog);
      seenPositionsOnLastLog = Math.floor(seenPositionLists.length / 1000);
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
    newPossiblePositionsList.forEach(newPossiblePositionList => {
      // Check if piece do not overlap
      if (renderPositions(newPossiblePositionList)) {
        // Check if we haven't seen this positions before
        if (!seenPositionLists.find(positions => arePositionsEqual(positions.positions, newPossiblePositionList))) {
          const newPossiblePositionListInfo = {
            positions: newPossiblePositionList,
            parentPositionListIndex: seenPositionLists.length
          };
          positionListsToCheck.push(newPossiblePositionListInfo);
          seenPositionLists.push(newPossiblePositionListInfo);
        }
      }
    });
  }

  fs.writeFileSync('./seen-positions.txt', logPositionsToString(seenPositionLists.map(item => item.positions)));

  // Find chain of positions that lead to the solved positions
  if (solvedPositionListInfo) {
    const solutionTrail: PositionList[] = [];
    let step: PositionListInfo = solvedPositionListInfo;
    while(step.parentPositionListIndex !== -1) {
      step = seenPositionLists[step.parentPositionListIndex] as PositionListInfo;
      solutionTrail.unshift(step.positions);
    }

    fs.writeFileSync('./solution-trail.txt', logPositionsToString(solutionTrail));

    return solvedPositionListInfo;
  } else {
    return null; // Solution not found
  }
}

console.log('Found valid solution: ', JSON.stringify(findSolution()));
console.log('trail written to ./solution-trail.txt');
