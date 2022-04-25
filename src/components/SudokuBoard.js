function isValid(board, x, y, num) {
  // check row
  for (let i = 0; i < 9; i++) {
    if (board[x][i] == num) {
      return false;
    }
  }
  // check column
  for (let i = 0; i < 9; i++) {
    if (board[i][y] == num) {
      return false;
    }
  }
  // check box
  let boxX = Math.floor(x / 3) * 3;
  let boxY = Math.floor(y / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxX + i][boxY + j] == num) {
        return false;
      }
    }
  }
  return true;
}

export async function solveSudoku(board) {
  for (var y = 0; y < 9; y++) {
    for (var x = 0; x < 9; x++) {
      if (board[y][x] == 0) {
        for (var k = 1; k <= 9; k++) {
          if (isValid(board, y, x, k)) {
            board[y][x] = k;
           
            await new Promise(resolve => setTimeout(resolve, 5)); // simulate a delay
            if (await solveSudoku(board)) {
              return true; //cnt 
            }
            board[y][x] = 0;
          }
        }
       
        return false; // dead end
      }
    }
  }

  console.log(board)
  return board;
}