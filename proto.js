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

// TODO: get a starting puzzle
const startingPuzzle = [
  /*****************************************/
  [/**/5, 0, 0, /**/0, 0, 1, /**/0, 6, 0/**/],
  [/**/0, 7, 1, /**/0, 0, 0, /**/4, 0, 2/**/],
  [/**/0, 2, 0, /**/0, 0, 0, /**/0, 8, 0/**/],
  /*****************************************/
  [/**/0, 6, 5, /**/7, 0, 4, /**/0, 3, 9/**/],
  [/**/1, 0, 0, /**/2, 0, 6, /**/0, 0, 4/**/],
  [/**/7, 4, 0, /**/9, 0, 3, /**/6, 1, 0/**/],
  // /*****************************************/
  [/**/0, 8, 0, /**/0, 0, 0, /**/0, 2, 0/**/],
  [/**/3, 0, 9, /**/0, 0, 0, /**/7, 4, 0/**/],
  [/**/0, 1, 0, /**/3, 0, 0, /**/0, 0, 5/**/],
  /*****************************************/
];

const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const optimizers = [loneSingle, hidden];

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
  const commandsToRun = optimizerCommandSets.reduce((pc, c) => pc.concat(c), []);

  return commandsToRun.reduce((p, command) => {
    return command(p);
  }, puzzle);
}

// don't have TCO in JS, so imperative loop it is
function solve(start) {
  var puzzle = start;
  console.log('start');
  while (1) {
    // printSolveProgress(puzzle);
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
  return puzzle.reduce((b, values) => {
    return values.reduce((b, value) => {
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

// TODO: right now this is a helper, but...
// could all other commands "reduce" into just modify cell commands?
function modifyCell(newValue) {
  return function(row, col) {
    return function(puzzle) {
      return puzzle.map((values, r) => {
        return values.map((oldValue, c) => {
          return r == row && c == col ? newValue : oldValue;
        });
      });
    };
  };
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
      const changedPuzzle = modifyCell(value)(row, col)(puzzle);

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
  return function(row, col) {
    return function(puzzle) {
      // erases pencil marks if it exists, otherwise nothing happens
      const newValue = puzzle[row][col] & (~marksToRemove);
      return modifyCell(newValue)(row, col)(puzzle);
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
    If the length of the subset is equal to N
      Then Find any other cell contains any subset of that subset (c & s1 == 0)
      If no cell was found with any subset of that subset, then all cells in the combination
      may set the marks to the subset

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

// generates a "map" for value to cells
function houseNumberMaps(house) {
  // TODO: this could be done more immutable-y, but this fn may go away
  // the Hidden-N algorithm does not rely on mappings being generated
  var mapping = [[], [], [], [], [], [], [], [], []];
  house.forEach((value, index) => {
    if ((value & ONE) === ONE) {
      mapping[0].push(index);
    }
    if ((value & TWO) === TWO) {
      mapping[1].push(index);
    }
    if ((value & THREE) === THREE) {
      mapping[2].push(index);
    }
    if ((value & FOUR) === FOUR) {
      mapping[3].push(index);
    }
    if ((value & FIVE) === FIVE) {
      mapping[4].push(index);
    }
    if ((value & SIX) === SIX) {
      mapping[5].push(index);
    }
    if ((value & SEVEN) === SEVEN) {
      mapping[6].push(index);
    }
    if ((value & EIGHT) === EIGHT) {
      mapping[7].push(index);
    }
    if ((value & NINE) === NINE) {
      mapping[8].push(index);
    }
  });
  return mapping;
}

function hiddenSingle(puzzle) {
  /*
  a hidden single is when a house contains a cell
  which that cell is the only one with a specific number

  take a house
  create an mapping of which values point to which numbers
  really... this needs to be re-used, because hiddenPair/Triple/etc need it

  if only one cell exists for a number, assign it
  */
  const houses = getAllHouses(puzzle);

  const bCommands = houses.blocks.reduce((commands, house, block) => {
    const mapping = houseNumberMaps(house);

    return mapping.reduce((commands, values, num) => {
      if (values.length !== 1) {
        return commands;
      }

      const index = values[0];
      const [row, col] = blockIndexToRowCol(block, index);
      return commands.concat(assign(num+1)(row, col));
    }, commands);
  }, []);

  const brCommands = houses.rows.reduce((commands, house, row) => {
    const mapping = houseNumberMaps(house);

    return mapping.reduce((commands, values, num) => {
      if (values.length !== 1) {
        return commands;
      }

      const col = values[0];
      return commands.concat(assign(num+1)(row, col));
    }, commands);
  }, []);

  const brcCommands = houses.cols.reduce((commands, house, col) => {
    const mapping = houseNumberMaps(house);

    return mapping.reduce((commands, values, num) => {
      if (values.length !== 1) {
        return commands;
      }

      const row = values[0];
      return commands.concat(assign(num+1)(row, col));
    }, commands);
  }, []);

  return bCommands.concat(brCommands).concat(brcCommands);
}

function generateCombinations(n, house) {
  if (n === 0) {
    return [[]];
  }

  return house.map(
    (v, x) => generateCombinations(n-1, house.slice(x+1)).map(i => [v].concat(i))
  ).reduce((a, v) => a.concat(v), []);
}

// function getCombinationSubsets(n, house) {
//   return generateCombinations(n, house).map(c => c.reduce((p, v) => p & v, ALL));
// }

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

function hiddenNHouse(n, commandBuilder) {
  return function(house, x) {
    const combinations = generateCombinations(n, indices);
    return combinations.reduce((commands, combo) => {
      const subsetBits = combo.reduce((p, v) => p & house[v], ALL);
      // if the length of the subset is not N, then it's not a hiddenN
      if (lengthOfSubset(subsetBits) !== n) {
        return commands;
      }

      // if any other cell has any subset of the subset, then we cannot do anything
      const otherCellIndices = indices.filter(i => combo.indexOf(i) === -1);
      if (otherCellIndices.some(i => house[i] & subsetBits !== 0)) {
        return commands;
      }

      const setToSubset = modifyCell(subsetBits);

      return commands.concat(combo.map(y => {
        console.log(x, y, (subsetBits >> 4), lengthOfSubset(subsetBits), combo);
        return commandBuilder(x)(y)(setToSubset);
      }));
    }, []);
  };
}

function hiddenN(n, puzzle) {
  const houses = getAllHouses(puzzle);

  // const blockReducer = hiddenNHouse(n, commandForBlock);
  // const bCommands = houses.blocks.map(blockReducer).reduce((a, c) => a.concat(c), []);

  const rowColReducer = hiddenNHouse(n, commandForRowCol);
  const rcCommands = houses.rows.map(rowColReducer).reduce((a, c) => a.concat(c), []);

  // const colRowReducer = hiddenNHouse(n, commandForColRow);
  // const crCommands = houses.cols.map(colRowReducer).reduce((a, c) => a.concat(c), []);

  console.log(rcCommands);
  throw new Error();

  // return bCommands.concat(rcCommands).concat(crCommands);
}

function hidden(puzzle) {
  const supportedLevels = [1]; // [1, 2, 3, 4]
  return supportedLevels.reduce((c, v) => c.concat(hiddenN(v, puzzle)), []);
}

const myPuzzle = start(emptyPuzzle, startingPuzzle);
const [error, result] = solve(myPuzzle);
if (error) {
  console.log(error);
  printSolveProgress(result);
} else {
  console.log('solved!');
  printSolveProgress(result);
}
