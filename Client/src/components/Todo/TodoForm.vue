<template>
    <form @submit.prevent="addTodo(todo)">
      <input v-model="todo" type="text" /><button>Add</button>
    </form>
  </template>
  
<script setup>
import { useTodoListStore } from '../../stores/todo.store'
import { ref } from "vue";
    const todo = ref("");

    const todoStore = useTodoListStore()

    function addTodo(item) {
        if (item.length === 0){
            return
        }
        todoStore.addTodo(item)
        todo.value = ''
    }
</script>