<template>
    <div class="todo-app">
      <h1>To Do List</h1>
      <todo-form />
      <todo-list />
    </div>
  </template>
  
  <script setup>
  import TodoForm from "../components/Todo/TodoForm.vue";
  import TodoList from "../components/Todo/TodoList.vue";
  </script>
  <style scoped>
  .todo-app {
    padding: 5vh;
    min-height: 100vh;
    width: 100%;
    background-color: black;
    color: white;
  }
  </style>