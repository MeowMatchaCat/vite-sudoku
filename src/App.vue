<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Sudoku from '/src/components/SudokuBoard.vue'
</script>

<template>
  <div class="content">
    <div class="title">Sudoku Board</div>
    <Sudoku></Sudoku>
  </div>
  
</template>

<style>
:root {
  padding: none;
  margin: none;

    font-family: 'robotoregular', sans-serif;

}
body {
  padding: none;
  margin: none;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
