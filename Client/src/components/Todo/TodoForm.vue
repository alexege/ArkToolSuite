<script setup>
  import { useUserStore } from '../../stores/user.store'
  import { useTodoStore } from '../../stores/todo.store'
  import { useCommentStore } from '../../stores/comment.store'
  import { storeToRefs } from 'pinia'
  import { ref } from "vue";

  const todoStore = useTodoStore()
    
  const { allUsers } = storeToRefs(useUserStore())
  const { fetchUsers } = useUserStore()
  const { fetchTodos } = useTodoStore()
    
  fetchUsers()
  fetchTodos()

  const categories = [
    "Breeding",
    "Taming",
    "Pvp",
    "Farming",
    "Artifacts",
    "Scouting"
  ]

  //Set default values
  const todoItem = ref({
    title: null,
    category: 'Breeding',
    priority: 'Low',
    completed: false,
    author: useUserStore.user ? useUserStore.user._id : null,
    comments: []
  })

  function addTodoItem() {

    const item = {
      title: todoItem.value.title,
      category: todoItem.value.category,
      priority: todoItem.value.priority,
      completed: todoItem.value.completed,
      author: todoItem.value.author || null,
      comments: []
    }
    
    todoStore.addTodo(item)
    todoItem.value.title = ''
  }
</script>
<template>
    <form @submit.prevent="addTodoItem()" class="headers-form">
      <div class="idx"></div>
      <div class="title">
        <input v-model="todoItem.title" type="text" class="title-input" placeholder="Todo Title"/>
      </div>
      <div class="category">
        <select name="" id="" v-model="todoItem.category" class="category-input">
          <option :value="category" v-for="category in categories" :key="category">{{ category }}</option>
        </select>
      </div>
      <div class="createdAt">
        Created
      </div>
      <div class="priority">
        <select name="" id="" v-model="todoItem.priority" class="priority-input">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div class="author">
        <select name="" id="" v-model="todoItem.author" class="author-input">
          <option :value="user._id" v-for="user in allUsers" :key="user.id">{{ user.username }}</option>
        </select>
      </div>
      <div class="actions">
        <button>Add</button>
      </div>
    </form> 
  </template>
<style scoped>

.headers-form {
  display: flex;
  gap: 0.5em;
  padding: 5px;
}

.idx {
  display: flex;
  flex: 0.25 1 0%;
}

.title {
  display: flex;
  flex: 2.5 1 0%;
}

.title-input {
  width: 100%;
}

.category {
  display: flex;
  flex: .5 1 0%;
}

.category-input {
  width: 100%;
}

.createdAt {
  display: flex;
  flex: .5 1 0%;
}

.priority {
  display: flex;
  flex: .5 1 0%;
}

.priority-input {
  width: 100%;
}

.author {
  display: flex;
  flex: .5 1 0%;
}

.author-input {
  width: 100%;
}

.actions {
  display: flex;
  flex: .5 1 0%;
}

.actions button {
  border: 1px solid white;
  padding: 5px;
  width: 100%;
}
</style>