

// var grid = [...sudoku.hard[1].map(e=>[...e])];
var possibleGrid = Array(81).fill(999);

var queue = [];




export function solveSudoku(grid) {

  var start = performance.now();

  var res = solve(grid).then(function (result) {
    if (result) {
      console.log("solved in", performance.now() - start, "ms");
      return true;
    } else {
      console.log("no solution");
      return false;
    }

    // console.log(grid, result);
  });

  return res;
}


function solved(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] == 0) {
        return false;
      }
    }
  }
  return true;
}

function getPossible(board, y, x, num) {

  if (board[y][x] !== 0) {
    return [];
  }
  var possible = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  var constrains = []


  for (let i = 0; i < 9; i++) {
    constrains.push(board[y][i])
    constrains.push(board[i][x])
  }

  let boxX = Math.floor(x / 3) * 3;
  let boxY = Math.floor(y / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      constrains.push(board[boxY + i][boxX + j])
    }
  }
  return possible.filter(e => !constrains.includes(e));
}

function getRange(board, y, x) {
  var result = [];

  var boxX = Math.floor(x / 3) * 3;
  var boxY = Math.floor(y / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxY + i][boxX + j] !== 0) {
        result.push(board[boxY + i][boxX + j]);
      }
    }
  }

  //check row and col
  for (let i = 0; i < 9; i++) {
    if (board[y][i] !== 0) {
      result.push(board[y][i]);
    }
    if (board[i][x] !== 0) {
      result.push(board[i][x]);
    }
  }


  return result;
}



function getMin(possibleGrid) {
  let min = 999;
  let minIndex = 0;
  for (let i = 0; i < 81; i++) {
    if (possibleGrid[i] !== 0 && possibleGrid[i] < min) {
      min = possibleGrid[i];
      minIndex = i;
    }
  }
  return [minIndex % 9, Math.floor(minIndex / 9)];
}


async function solve(board, depth = 0) {

  for (var y = 0; y < 9; y++) {
    for (var x = 0; x < 9; x++) {
      var tempP = getPossible(board, y, x);
      possibleGrid[x * 9 + y] = tempP.length;
    }
  }


  // console.log(possibleGrid);

  if (solved(board)) {
    console.log("board solved", board);
    return board;
  }

  var [y, x] = getMin(possibleGrid);

  var possibleNumbers = getPossible(board, y, x);
  // console.log(y, x, possibleNumbers)

  if (possibleNumbers.length === 0)
    return false

  for (var i = 0; i < possibleNumbers.length; i++) {
    var c = possibleNumbers[i];
    board[y][x] = c;
    if (await solve(board, depth + 1)) {
      return board;
    }


  }


  board[y][x] = 0;
  return false;
}

function newBoard() {
  possibleGrid = Array(81).fill(999);
}

function sleepms(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

