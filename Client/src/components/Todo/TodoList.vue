<template>
  <div>
    <div v-for="todo in todoList" :key="todo.id" class="list">
      <div class="item" v-if="todo">
        <span :class="{ completed: todo.completed }" class="title">{{ todo.title }}</span>
        <div class="priority">{{ todo?.priority }}</div>
        <div class="assignee">{{todo?.assignee?.username || 'assignee'}}</div>
        <div class="actions">
          <span @click.stop="toggleComp(todo)">&#10004;</span>
          <span @click="delTodo(todo._id)" class="x">&#10060;</span>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { useTodoListStore } from "../../stores/todo.store.js";
  import { storeToRefs } from "pinia";

      const { todoList } = storeToRefs(useTodoListStore());
      const { toggleCompleted, deleteTodo } = useTodoListStore();

      function toggleComp(todo) {
        toggleCompleted(todo)
      }

      function delTodo(id) {
        deleteTodo(id)
      }

  </script>
  
  <style scoped>
  span {
    margin: 0 10px;
    cursor: pointer;
  }
  
  .completed {
    text-decoration: line-through;
  }
  
  .list {
    display: flex;
    justify-content: center;
  }
  
  .item {
    display: flex;
    font-size: 1.5em;
    justify-content: space-between;
    width: 80vw;
    padding: 5px;
  }

.title {
  display: flex;
  flex: 2.5 1 0%;
}
.priority {
  display: flex;
  flex: .5 1 0%;
}

.assignee {
  display: flex;
  flex: .5 1 0%;
}

.action {
  display: flex;
  flex: .5 1 0%;
}
  </style>