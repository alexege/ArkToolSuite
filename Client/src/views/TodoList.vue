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
  <style lang="scss" scoped>
  .todo-app {
    color: white;
  }
  </style>