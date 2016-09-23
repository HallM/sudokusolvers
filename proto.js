// first 4 bits are allocated for the value (1-9)
// next 9 bits are used for the "pencil marks"
const ONE = 1 << 4;
const TWO = 1 << 5;
const THREE = 1 << 6;
const FOUR = 1 << 7;
const FIVE = 1 << 8;
const SIX = 1 << 9;
const SEVEN = 1 << 10;
const EIGHT = 1 << 11;
const NINE = 1 << 12;

const ALL = ONE | TWO | THREE | FOUR | FIVE | SIX | SEVEN | EIGHT | NINE;

const emptyPuzzle = [
  /***********************************************************/
  [/**/ALL, ALL, ALL, /**/ALL, ALL, ALL, /**/ALL, ALL, ALL/**/],
  [/**/ALL, ALL, ALL, /**/ALL, ALL, ALL, /**/ALL, ALL, ALL/**/],
  [/**/ALL, ALL, ALL, /**/ALL, ALL, ALL, /**/ALL, ALL, ALL/**/],
  /***********************************************************/
  [/**/ALL, ALL, ALL, /**/ALL, ALL, ALL, /**/ALL, ALL, ALL/**/],
  [/**/ALL, ALL, ALL, /**/ALL, ALL, ALL, /**/ALL, ALL, ALL/**/],
  [/**/ALL, ALL, ALL, /**/ALL, ALL, ALL, /**/ALL, ALL, ALL/**/],
  /***********************************************************/
  [/**/ALL, ALL, ALL, /**/ALL, ALL, ALL, /**/ALL, ALL, ALL/**/],
  [/**/ALL, ALL, ALL, /**/ALL, ALL, ALL, /**/ALL, ALL, ALL/**/],
  [/**/ALL, ALL, ALL, /**/ALL, ALL, ALL, /**/ALL, ALL, ALL/**/],
  /***********************************************************/
];

// template for puzzle
// const puzzlename = [
//   /*****************************************/
//   [/**/0, 0, 0, /**/0, 0, 0, /**/0, 0, 0/**/],
//   [/**/0, 0, 0, /**/0, 0, 0, /**/0, 0, 0/**/],
//   [/**/0, 0, 0, /**/0, 0, 0, /**/0, 0, 0/**/],
//   /*****************************************/
//   [/**/0, 0, 0, /**/0, 0, 0, /**/0, 0, 0/**/],
//   [/**/0, 0, 0, /**/0, 0, 0, /**/0, 0, 0/**/],
//   [/**/0, 0, 0, /**/0, 0, 0, /**/0, 0, 0/**/],
//   /*****************************************/
//   [/**/0, 0, 0, /**/0, 0, 0, /**/0, 0, 0/**/],
//   [/**/0, 0, 0, /**/0, 0, 0, /**/0, 0, 0/**/],
//   [/**/0, 0, 0, /**/0, 0, 0, /**/0, 0, 0/**/],
//   /*****************************************/
// ];

// TODO: get a starting puzzle
const easyPuzzle = [
  /*****************************************/
  [/**/5, 0, 0, /**/0, 0, 1, /**/0, 6, 0/**/],
  [/**/0, 7, 1, /**/0, 0, 0, /**/4, 0, 2/**/],
  [/**/0, 2, 0, /**/0, 0, 0, /**/0, 8, 0/**/],
  /*****************************************/
  [/**/0, 6, 5, /**/7, 0, 4, /**/0, 3, 9/**/],
  [/**/1, 0, 0, /**/2, 0, 6, /**/0, 0, 4/**/],
  [/**/7, 4, 0, /**/9, 0, 3, /**/6, 1, 0/**/],
  /*****************************************/
  [/**/0, 8, 0, /**/0, 0, 0, /**/0, 2, 0/**/],
  [/**/3, 0, 9, /**/0, 0, 0, /**/7, 4, 0/**/],
  [/**/0, 1, 0, /**/3, 0, 0, /**/0, 0, 5/**/],
  /*****************************************/
];
const mediumPuzzle263 = [
  /*****************************************/
  [/**/0, 8, 0, /**/0, 7, 0, /**/0, 0, 6/**/],
  [/**/0, 0, 0, /**/0, 0, 6, /**/0, 0, 3/**/],
  [/**/2, 0, 0, /**/0, 0, 9, /**/0, 0, 5/**/],
  /*****************************************/
  [/**/7, 0, 0, /**/0, 0, 0, /**/0, 0, 0/**/],
  [/**/5, 0, 0, /**/0, 0, 0, /**/0, 0, 8/**/],
  [/**/0, 2, 4, /**/5, 0, 0, /**/0, 0, 0/**/],
  /*****************************************/
  [/**/0, 5, 8, /**/3, 0, 0, /**/0, 2, 0/**/],
  [/**/4, 0, 9, /**/0, 0, 0, /**/0, 7, 0/**/],
  [/**/0, 0, 0, /**/0, 5, 0, /**/0, 0, 9/**/],
  /*****************************************/
];
const mediumPuzzle264 = [
  /*****************************************/
  [/**/3, 0, 0, /**/0, 8, 0, /**/0, 5, 0/**/],
  [/**/0, 0, 0, /**/0, 0, 4, /**/0, 0, 0/**/],
  [/**/0, 2, 0, /**/0, 0, 6, /**/9, 0, 0/**/],
  /*****************************************/
  [/**/0, 0, 0, /**/0, 0, 0, /**/0, 0, 0/**/],
  [/**/8, 0, 2, /**/0, 0, 5, /**/0, 0, 0/**/],
  [/**/0, 9, 0, /**/0, 6, 0, /**/1, 0, 7/**/],
  /*****************************************/
  [/**/5, 0, 0, /**/0, 0, 7, /**/0, 0, 4/**/],
  [/**/0, 8, 0, /**/2, 0, 0, /**/0, 0, 0/**/],
  [/**/0, 3, 0, /**/5, 0, 0, /**/7, 0, 0/**/],
  /*****************************************/
];
const hardPuzzle261 = [
  /*****************************************/
  [/**/8, 0, 0, /**/0, 6, 0, /**/3, 9, 7/**/],
  [/**/9, 1, 0, /**/2, 0, 0, /**/0, 0, 0/**/],
  [/**/0, 0, 0, /**/4, 0, 0, /**/0, 0, 0/**/],
  /*****************************************/
  [/**/0, 0, 7, /**/9, 0, 0, /**/0, 0, 0/**/],
  [/**/0, 0, 4, /**/0, 0, 0, /**/0, 2, 5/**/],
  [/**/2, 0, 0, /**/6, 7, 0, /**/0, 0, 0/**/],
  /*****************************************/
  [/**/0, 0, 0, /**/0, 9, 1, /**/0, 0, 0/**/],
  [/**/4, 0, 0, /**/0, 0, 0, /**/0, 3, 0/**/],
  [/**/0, 0, 0, /**/0, 0, 0, /**/6, 1, 0/**/],
  /*****************************************/
];
const hardPuzzle262 = [
  /*****************************************/
  [/**/0, 8, 0, /**/0, 0, 0, /**/0, 5, 0/**/],
  [/**/0, 4, 7, /**/0, 0, 2, /**/0, 6, 9/**/],
  [/**/0, 0, 0, /**/0, 0, 0, /**/0, 0, 2/**/],
  /*****************************************/
  [/**/0, 3, 6, /**/0, 8, 0, /**/1, 0, 0/**/],
  [/**/0, 0, 0, /**/0, 4, 0, /**/2, 9, 0/**/],
  [/**/0, 0, 0, /**/0, 5, 0, /**/0, 0, 0/**/],
  /*****************************************/
  [/**/0, 0, 0, /**/0, 0, 0, /**/6, 0, 0/**/],
  [/**/5, 0, 0, /**/0, 0, 0, /**/0, 0, 3/**/],
  [/**/1, 0, 9, /**/0, 7, 6, /**/0, 0, 0/**/],
  /*****************************************/
];
const startingPuzzle = hardPuzzle262;

const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const optimizers = [loneSingle, naked, hidden, omission];

// generate a table of "lengths" of any bitfield subset
const subsetLengthTable = function generateSubsetLengthTable() {
  var table = new Array(512);
  table[0] = 0;
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(
    (a, n) => {
      const combinations = generateCombinations(n, [ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE]);
      return combinations.reduce((a, c) => {
        const bitmask = c.reduce((p, v) => p | v, 0) >> 4;
        a[bitmask] = c.length;
        return a;
      }, a);
    }
  , table);
}();

function lengthOfSubset(subset) {
  const bitmask = (subset >> 4) & 511;
  return subsetLengthTable[bitmask];
}

function printSolveProgress(puzzle) {
  console.log('|-----|-----|-----|');
  console.log(puzzle.map((values, r) => {
    const t = ((r+1) % 3 === 0 ? '\n|-----|-----|-----|' : '');

    return '|' + values.map((value, c) => {
      const t = (c+1) % 3 === 0 ? '|' : ' ';
      const str = value > 0 && value < 10 ? value.toString() : '-';
      return str + t;
    }).join('') + t;
  }).join('\n'));
}

function start(empty, start) {
  return start.reduce((p, values, row) => {
    return values.reduce((p, value, col) => {
      if (value > 0) {
        return assign(value)(row, col)(p);
      } else {
        return p;
      }
    }, p);
  }, empty);
}

function doReductions(puzzle) {
  // this map can kick off all optimizers concurrently, then later aggregate commands
  const optimizerCommandSets = optimizers.map(fn => fn(puzzle));
  return optimizerCommandSets.reduce((p, commands) => {
    return commands.reduce((p, command) => command(p), p);
  }, puzzle);
}

// don't have TCO in JS, so imperative loop it is
function solve(start) {
  var puzzle = start;
  console.log('start');
  while (1) {
    printSolveProgress(puzzle);
    console.log('iteration');
    const reduced = doReductions(puzzle);

    if (isSolved(reduced)) {
      return [null, reduced];
    }

    if (!checkConsistency(reduced)) {
      return ['A cell has no value and no marks. The puzzle cannot be solved', reduced];
    }

    if (reduced === puzzle) {
      return ['Unable to solve puzzle', reduced];
    }

    puzzle = reduced;
  }
}

// due to how pencil marks are, it's easy to know
// if value is 0 or > 9, it's an unsolved spot
function isSolved(puzzle) {
  return puzzle.reduce((b, values) => {
    return values.reduce((b, value) => {
      return b && (value > 0 && value < 10);
    }, b);
  }, true);
}

function checkConsistency(puzzle) {
  return puzzle.reduce((b, values, row) => {
    return values.reduce((b, value, col) => {
      return b && (value > 0);
    }, b);
  }, true);
}

function valueToMark(value) {
  return 1 << value + 3;
}

function blockUpperLeft(block) {
  const startRow = Math.floor(block / 3) * 3;
  const startCol = block % 3 * 3;
  return [startRow, startCol];
}

function blockIndexToRowCol(block, index) {
  const [startRow, startCol] = blockUpperLeft(block);

  const r = Math.floor(index / 3);
  const c = index % 3;

  return [r+startRow, c+startCol];
}

function getAllBlockRowCols(block) {
  const [startRow, startCol] = blockUpperLeft(block);
  return [
    [startRow, startCol],
    [startRow, startCol+1],
    [startRow, startCol+2],

    [startRow+1, startCol],
    [startRow+1, startCol+1],
    [startRow+1, startCol+2],

    [startRow+2, startCol],
    [startRow+2, startCol+1],
    [startRow+2, startCol+2]
  ];
}

function getBlockForRowCol(row, col) {
  const br = Math.floor(row / 3) * 3;
  const bc = Math.floor(col / 3);
  return br + bc;
}

// blocks are numbered 0-8, top left is 0, top center is 1, bottom right is 8
function getBlockHouse(puzzle, block) {
  const blockRowCols = getAllBlockRowCols(block);
  return blockRowCols.map(v => puzzle[v[0]][v[1]]);
}

// using the 1-9 notation
function getRowHouse(puzzle, row) {
  return puzzle[row].slice();
}

// using the A-I notation
function getColHouse(puzzle, col) {
  return indices.map(r => puzzle[r][col]);
}

function getAllHouses(puzzle) {
  return {
    blocks: indices.map(i => getBlockHouse(puzzle, i)),
    rows: indices.map(i => getRowHouse(puzzle, i)),
    cols: indices.map(i => getColHouse(puzzle, i))
  };
}

// this is a helper to keep the puzzle immutable
// by nature of setting values, it cannot be executed out of order
// unlike assign/removeMarks, it cannot be a command
function modifyCell(newValue, row, col, puzzle) {
  // this is an invalid case. either bug or an invalid puzzle
  if (newValue === 0) {
    throw new Error(['tried to set 0 at:', row, col, newValue, puzzle[row][col]].join(', '));
  }

  // if nothing changes, just return the puzzle
  if (puzzle[row][col] === newValue) {
    return puzzle;
  }

  return puzzle.map((values, r) => {
    // we can share parts of the puzzle to reduce allocations
    if (r !== row) {
      return values;
    }

    // only allocate a new row if any part of the row changed
    return values.map((oldValue, c) => {
      return c === col ? newValue : oldValue;
    });
  });
}

// Commands
// All commands have a (rough) signature of
// value -> (row, col) -> puzzle
// or in ML/F# land, value -> row -> col -> puzzle
// once in F#, the partial application/curring is automatic
// value is first to make application of a value to multiple more functional
// puzzle is last to support deferred, idempotent application of a command

function assign(value) {
  return function(row, col) {
    return function(puzzle) {
      // will erase all pencil marks as well
      const changedPuzzle = modifyCell(value, row, col, puzzle);

      const mark = valueToMark(value);
      const removedAssignedMark = removeMarks(mark);

      // reduce the value out of the row, these are col indices
      const reducedRow = indices.reduce((p, cI) => {
        return removedAssignedMark(row, cI)(p);
      }, changedPuzzle);

      // reduce the value out of the col, these are row indices
      const reducedRowAndCol = indices.reduce((p, rI) => {
        return removedAssignedMark(rI, col)(p);
      }, reducedRow);

      // reduce the value out of the block
      const block = getBlockForRowCol(row, col);
      const reducedRowAndColAndBlock = getAllBlockRowCols(block).reduce((p, i) => {
        return removedAssignedMark(i[0], i[1])(p);
      }, reducedRowAndCol);

      return reducedRowAndColAndBlock;
    };
  };
}

// reducing removes possibles (marks) from a location
function removeMarks(marksToRemove) {
  if (marksToRemove === ALL) {
    throw new Error('Cannot remove all marks from a cell');
  }

  return function(row, col) {
    return function(puzzle) {
      // erases pencil marks if it exists, otherwise nothing happens
      const inverseMarks = ~marksToRemove;
      const safeInverseMarks = (inverseMarks | 0xF) & 0x1FFF;

      const newValue = puzzle[row][col] & safeInverseMarks;
      return modifyCell(newValue, row, col, puzzle);
    }
  }
}

/* Reducers */
/*
  Concurrent thoughts:
  - Each algorithm receives the current puzzle state
  - Each algorithm may internally use a different state (puzzle is immutable)
  - Each algorithm produces a list of idempotent "commands" (assign, remove mark)
  - The loop kicks off all algorithms at the same time
  - The loop gathers the list of commands from all algorithms, then executes them
  - The design of the commands allows for command order to not matter
    and repeating a command has no effect.

  Algorithms:
  - Lone Single: (this is a specialized Naked-1)
    Any cell with a single mark must be that value

  - Naked-N: (only processing where N is 2..4 inclusive)
    N number of cells in a house have only the exact same N-length subset of pencil marks.
    In this case, all other cells can remove all N elements
    Collect information about cells in a house with shared pencil marks (just check bit-mark equality)
    For each set less than 4, count the set bits of the shared mark bitfield
      If the number of set bits is equal to the number of items in the set:
        Then remove all marks from all others in the house (cell = cell & (~sharedMarkedBits))
      Otherwise, skip

  - Hidden-N: (only processing where N is 1..4 inclusive)
    Only N-number of cells in a house contain the same N-length subset of pencil marks.
    In this case, all other marks in these N cells may be removed
    Find the common subset between N-length combinations (use bitwise AND)
    Determine the unique portion of that subset (using bitwise AND, NEG the other cell)
    If the length of the unique subset is equal to N
      then all cells in the combination may set the marks in the unique subset

  - Omissions:
    If a block-house can prove a number must be in a row or col,
    then the rest of the row or col can omit that pencil mark
    If a row/col-house can prove a number must be in a block,
    then the rest of the block can omit that pencil mark
    More generally:
    Suppose a sub-house is a subset of house A and house B,
    If this subset is the only set which may contain a set of pencil marks in house A,
    then house B may omit that set of pencil marks from all other cells which are not in the subset
    For each row:
      if particular mark occurs only inside a single block:
        then the rest of that block can unmark that number
    For each col: (same thing really)
      if particular mark occurs only inside a single block:
        then the rest of that block can unmark that number
    For each block:
      if a mark occurs only in a single row:
        then the rest of that row can unmark that number
      if a mark occurs only in a single col:
        then the rest of that col can unmark that number


  - Basic fish-N:
    N number of rows/cols contain a pencil mark N times
    AND an overlapping (cover) N-number of cols/rows exists
    Then all candidates in the cols/rows of the cover houses can be removed.
    Note: do not remove the candidate from all cells, only the ones in the "cover-house" col/row

  - X-Wing
  - Swordfish
  - XY-Wing
  - Unique Rectangle

*/

/* Algorithm Helpers */

function generateCombinations(n, house) {
  if (n === 0) {
    return [[]];
  }

  return house.map(
    (v, x) => generateCombinations(n-1, house.slice(x+1)).map(i => [v].concat(i))
  ).reduce((a, v) => a.concat(v), []);
}

function commandForRowCol(row) {
  return function(col) {
    return function(fn) {
      return fn(row, col);
    };
  };
}

function commandForColRow(col) {
  return function(row) {
    return function(fn) {
      return fn(row, col);
    };
  };
}

function commandForBlock(block) {
  return function(index) {
    const [row, col] = blockIndexToRowCol(block, index);
    return function(fn) {
      return fn(row, col);
    };
  };
}

function mapToAllHouses(fn, fnBlockOptional) {
  return function(n, puzzle) {
    const houses = getAllHouses(puzzle);

    const blockReducer = (fnBlockOptional || fn)(n, commandForBlock);
    const bCommands = houses.blocks.map(blockReducer).reduce((a, c) => a.concat(c), []);

    const rowColReducer = fn(n, commandForRowCol);
    const rcCommands = houses.rows.map(rowColReducer).reduce((a, c) => a.concat(c), []);

    const colRowReducer = fn(n, commandForColRow);
    const crCommands = houses.cols.map(colRowReducer).reduce((a, c) => a.concat(c), []);

    return bCommands.concat(rcCommands).concat(crCommands);
  };
}

function commonSubsetInGroup(group, house) {
  // skips over filled cells
  return group.reduce((p, v) => house[v] > 9 ? (p & house[v]) : p, ALL) & 0x1FF0;
}

function uniqueSubsetInCells(subsetBits, otherCellIndices, house) {
  return otherCellIndices.reduce((p, v) => house[v] > 9 ? (p & (~house[v])) : p, subsetBits) & 0x1FF0;
}

/* Lone Single (Naked-1) */

function loneSingle(puzzle) {
  return puzzle.reduce((commands, values, row) => {
    return values.reduce((commands, value, col) => {
      switch (value) {
        case ONE:
          return commands.concat(assign(1)(row, col));
        case TWO:
          return commands.concat(assign(2)(row, col));
        case THREE:
          return commands.concat(assign(3)(row, col));
        case FOUR:
          return commands.concat(assign(4)(row, col));
        case FIVE:
          return commands.concat(assign(5)(row, col));
        case SIX:
          return commands.concat(assign(6)(row, col));
        case SEVEN:
          return commands.concat(assign(7)(row, col));
        case EIGHT:
          return commands.concat(assign(8)(row, col));
        case NINE:
          return commands.concat(assign(9)(row, col));
        default:
          return commands;
      }
    }, commands);
  }, []);
}

/* HiddenN */

function hiddenNHouse(n, commandBuilder) {
  return function(house, x) {
    const unfilledCells = indices.filter(i => house[i] > 9);

    const combinations = generateCombinations(n, unfilledCells);
    return combinations.reduce((commands, combo) => {
      const subsetBits = commonSubsetInGroup(combo, house);

      // determine if there is a unique portion of this subset
      const otherCellIndices = unfilledCells.filter(i => combo.indexOf(i) === -1);
      const uniqueBits = uniqueSubsetInCells(subsetBits, otherCellIndices, house);

      // if that unique portion is length N...

      // if the length of the subset is not N, then it's not a hiddenN
      if (lengthOfSubset(uniqueBits) !== n) {
        return commands;
      }

      // we remove all other marks that are not the unique bits
      const marksToRemove = (~uniqueBits) & 0x1FF0;
      const removeAllOtherMarks = removeMarks(marksToRemove);

      return commands.concat(combo.map(y => {
        return commandBuilder(x)(y)(removeAllOtherMarks);
      }));
    }, []);
  };
}
const hiddenN = mapToAllHouses(hiddenNHouse);

function hidden(puzzle) {
  const supportedLevels = [1, 2, 3, 4];
  return supportedLevels.reduce((c, v) => c.concat(hiddenN(v, puzzle)), []);
}

/* NakedN */

function nakedNHouse(n, commandBuilder) {
  return function(house, x) {
    const unfilledCells = indices.filter(i => house[i] > 9);

    const combinations = generateCombinations(n, unfilledCells);
    return combinations.reduce((commands, combo) => {
      // check length of marks in the first
      const nakedMarks = house[combo[0]];
      if (lengthOfSubset(nakedMarks) !== n) {
        return commands;
      }

      // check if all cells in the combination have the exact same marks
      if (!combo.every(v => house[v] === nakedMarks)) {
        return commands;
      }

      // then we can remove these marks from all other cells
      const otherCellIndices = unfilledCells.filter(i => combo.indexOf(i) === -1);

      const removeNakedMarks = removeMarks(nakedMarks);

      return commands.concat(otherCellIndices.map(y => {
        return commandBuilder(x)(y)(removeNakedMarks);
      }));
    }, []);
  };
}
const nakedN = mapToAllHouses(nakedNHouse);

function naked(puzzle) {
  // N=1 is a special case handled by loneSingle
  const supportedLevels = [2, 3, 4];
  return supportedLevels.reduce((c, v) => c.concat(hiddenN(v, puzzle)), []);
}

/* Omission */

function filterFromBlockRowCols(blockRowCols) {
  return function(rows, cols) {
    return blockRowCols.filter(v => rows.indexOf(v[0]) === -1 || cols.indexOf(v[1]) === -1);
  };
}

function omissionRowOrCol(n, commandBuilder) {
  return function(house, x) {
    // look at the row/col in groups of 3 (belong to same block)
    const cellGroups = [0, 1, 2].map(i => indices.slice(i*3, (i*3)+3));

    return cellGroups.reduce((commands, combo) => {
      // get the common subset of these
      const subsetBits = commonSubsetInGroup(combo, house);

      // if a mark is unique to those 3 and not other cells in the row/col
      const otherCellIndices = indices.filter(i => combo.indexOf(i) === -1);
      // TODO: we should be able to factor this out
      const uniqueBits = uniqueSubsetInCells(subsetBits, otherCellIndices, house);

      if (subsetBits <= 9 || subsetBits >= ALL || subsetBits !== uniqueBits) {
        return commands;
      }

      // we will remove the subset of marks from the rest of the block
      const removeOmissionMarks = removeMarks(subsetBits);

      // get the block of that row
      // using commandbuilder here, because it gets the row/col the order we need it
      const block = commandBuilder(x)(combo[0])(getBlockForRowCol);

      // get all indices of the block
      const blockIndices = getAllBlockRowCols(block);

      // filter out the ones not in the row
      // using array of rows/cols instead of just a single row/col
      const otherBlockCells = commandBuilder([x])(combo)(filterFromBlockRowCols(blockIndices));

      // remove the mark from those cells
      return commands.concat(otherBlockCells.map(v => removeOmissionMarks(v[0], v[1])));
    }, []);
  };
}

function omissionBlock(n, commandBuilder) {
  return function(house, block) {
    // look at the block based on rows (first 3, then next set...)
    // if a mark is unique to those 3 and not other cells in the block
    // then remove that mark from the rest of that row
    const cellsGroupedByRows = [0, 1, 2].map(i => indices.slice(i*3, (i*3)+3));
    const commandsForRow = cellsGroupedByRows.reduce((commands, combo) => {
      const subsetBits = commonSubsetInGroup(combo, house);
      const otherCellIndices = indices.filter(i => combo.indexOf(i) === -1);
      const uniqueBits = uniqueSubsetInCells(subsetBits, otherCellIndices, house);

      if (subsetBits <= 9 || subsetBits >= ALL || subsetBits !== uniqueBits) {
        return commands;
      }

      const removeOmissionMarks = removeMarks(subsetBits);

      const [row, leftcol] = blockIndexToRowCol(block, combo[0]);
      const rightcol = leftcol + 2; // 2 for an inclusive 0..2, 3..5, 6..8

      const rowColIndicesToChange = indices.filter(i => i < leftcol || i > rightcol);

      return commands.concat(rowColIndicesToChange.map(y => {
        return removeOmissionMarks(row, y);
      }));
    }, []);

    // now for cols
    // look at the block based on cols (not as clean to split)
    // if a mark is unique to those 3 and not other cells in the block
    // then remove that mark from the rest of that col
    const cellsGroupedByCols = [0, 1, 2].map(c => [0, 1, 2].map(r => indices[(r*3)+c]));
    const commandsForCol = cellsGroupedByCols.reduce((commands, combo) => {
      const subsetBits = commonSubsetInGroup(combo, house);
      const otherCellIndices = indices.filter(i => combo.indexOf(i) === -1);
      const uniqueBits = uniqueSubsetInCells(subsetBits, otherCellIndices, house);

      if (subsetBits <= 9 || subsetBits >= ALL|| subsetBits !== uniqueBits) {
        return commands;
      }

      const removeOmissionMarks = removeMarks(subsetBits);

      const [toprow, col] = blockIndexToRowCol(block, combo[0]);
      const bottomrow = toprow + 2; // 2 for an inclusive 0..2, 3..5, 6..8

      const colRowIndicesToChange = indices.filter(i => i < toprow || i > bottomrow);

      return commands.concat(colRowIndicesToChange.map(y => {
        return removeOmissionMarks(y, col);
      }));
    }, []);

    return commandsForRow.concat(commandsForCol);
  };
}

const omissionHouses = mapToAllHouses(omissionRowOrCol, omissionBlock);

function omission(puzzle) {
  return omissionHouses(1, puzzle);
}

/* Now to just run the solver */

const myPuzzle = start(emptyPuzzle, startingPuzzle);
const [error, result] = solve(myPuzzle);
if (error) {
  console.log(error);
  printSolveProgress(result);
} else {
  console.log('solved!');
  printSolveProgress(result);
}
