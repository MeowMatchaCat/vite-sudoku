<template>
  <div class="solve-button">
    <button @click="solve">Solve</button>
    <button @click="reset">Reset</button>
    <button @click="newGame">New Game</button>
  </div>
  <div class="info">
    <div>{{ difficulty }}</div>
    <div>#{{ index }}</div>
  </div>

  <div class="result">
    {{ result ? "Solved" : "Not Solved" }}
  </div>

  <div class="board">
    <div v-for="(row, y) in board" class="row" :key="row">
      <div v-for="(item, x) in row" class="item" :key="x + ',' + y">
        <div v-if="item !== 0">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
//import the sudoku.json
import sudoku from "./sudoku.json";
import { solveSudoku } from "./SudokuBoard.js";

export default {
  name: "SudokuBoard",
  data: function () {
    return {
      difficulties: ["easy", "medium", "hard"],
      board: [
        [8, 5, 2, 9, 7, 6, 2, 4, 3],
        [6, 7, 9, 1, 4, 3, 2, 8, 5],
        [0, 3, 1, 2, 5, 8, 7, 6, 9],
        [3, 1, 4, 5, 2, 7, 8, 9, 6],
        [7, 6, 8, 3, 9, 1, 4, 5, 0],
        [9, 2, 5, 6, 0, 0, 3, 7, 1],
        [5, 4, 3, 8, 6, 2, 9, 1, 7],
        [1, 9, 7, 4, 3, 5, 0, 2, 8],
        [2, 8, 6, 7, 1, 9, 5, 3, 4],
      ],
      difficulty: "easy",
      index: 0,
      //import the sudoku.json file as a dictionary
      maps: sudoku,
      result: false,
    };
  },
  methods: {
    async solve() {
      this.result = await solveSudoku([...this.board]);
      console.log(this.result);
    },
    newGame() {
      //choose a random difficulty very easy, easy ,medium, hard,
      var difficulty =
        this.difficulties[Math.floor(Math.random() * this.difficulties.length)];
      this.index = Math.floor(Math.random() * this.maps[difficulty].length);
      this.difficulty = difficulty;

      this.board = this.maps[difficulty][this.index];

      // console.log(this.board)
    },
  },
};
</script>

<style>
.info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.info div {
  padding: 10px;

  font-size: 20px;
}

button {
  padding: 10px;
  margin: 10px;
  border: none;
  background-color: #f5f5f5;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.row {
  display: flex;
  flex-direction: row;
}
.item {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  text-align: center;
  line-height: 50px;
  font-size: 30px;

  border-radius: 5px;
  margin: 5px;

  /* every 3rd element give a green background */

  /* background: #ff00ff; */
}

/* rows 4,5,6 give board of green*/
.item:nth-child(4),
.item:nth-child(5),
.item:nth-child(6) {
  background: #add8e6;
}

.row:nth-child(4) .item,
.row:nth-child(5) .item,
.row:nth-child(6) .item {
  background: #add8e6;
}

/* 4 through 6 */
.row:nth-child(4) .item:nth-child(4) {
  background: #fff;
}
.row:nth-child(4) .item:nth-child(5) {
  background: #fff;
}
.row:nth-child(4) .item:nth-child(6) {
  background: #fff;
}

.row:nth-child(5) .item:nth-child(4) {
  background: #fff;
}
.row:nth-child(5) .item:nth-child(5) {
  background: #fff;
}
.row:nth-child(5) .item:nth-child(6) {
  background: #fff;
}

.row:nth-child(6) .item:nth-child(4) {
  background: #fff;
}
.row:nth-child(6) .item:nth-child(5) {
  background: #fff;
}
.row:nth-child(6) .item:nth-child(6) {
  background: #fff;
}
</style>