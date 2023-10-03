<template>
    <form @submit.prevent="addTodo(todoItem)">
      <div class="title">
        <input v-model="todoItem.title" type="text" class="title-input"/>
      </div>
      <div class="priority">
        <select name="" id="" v-model="todoItem.priority" class="priority-input">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div class="assignee">
        <select name="" id="" v-model="todoItem.assignee" class="assignee-input">
          <option value="" disabled>Asignee</option>
          <option value="" v-for="user in allUsers" :key="user.id">{{ user.username }}</option>
        </select>
      </div>
      <div class="actions">
        <button>Add</button>
      </div>
    </form>
  </template>
  
<script setup>
import { useTodoListStore } from '../../stores/todo.store'
import { useUserStore } from '../../stores/user.store';
import { storeToRefs } from 'pinia'
import { ref } from "vue";
    const todo = ref("");

    const todoStore = useTodoListStore()
    const { allUsers } = storeToRefs(useUserStore())
    const { fetchUsers } = useUserStore()

    fetchUsers()

    const user = JSON.parse(localStorage.getItem("user"));

    //Set default values
    const todoItem = ref({
      title: null,
      priority: 'low',
      completed: false,
      assignee: user.id
    })

    function addTodo(item) {
      console.log("user:", user);
      if (item.length === 0){
        return
      }
      todoStore.addTodo(todoItem.value)
      todo.value = ''
    }
</script>
<style scoped>
form {
  display: flex;
}

.title {
  display: flex;
  flex: 2.5 1 0%;
}

.title-input {
  width: 100%;
}

.priority {
  display: flex;
  flex: .5 1 0%;
}

.priority-input {
  width: 100%;
}

.assignee {
  display: flex;
  flex: .5 1 0%;
}

.assignee-input {
  width: 100%;
}

.action {
  display: flex;
  flex: .5 1 0%;
}
</style>