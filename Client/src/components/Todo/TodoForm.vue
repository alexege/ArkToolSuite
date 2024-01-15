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
      <div class="assignee">
        <select name="" id="" v-model="todoItem.assignee" class="assignee-input">
          <option value="Assignee" disabled>Author</option>
          <option :value="user._id" v-for="user in allUsers" :key="user.id">{{ user.username }}</option>
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

    const todoStore = useTodoListStore()
    const userStore = useUserStore()
    const { fetchTodos } = useTodoListStore()
    
    const { allUsers } = storeToRefs(useUserStore())
    const { fetchUsers } = useUserStore()

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
      category: 'breeding',
      priority: 'Low',
      completed: false,
      author: null,
      comments: []
    })

    function addTodoItem() {
      let author = null;
      if (!todoItem.value.author) {
        author = userStore.user
        console.log("No author found, setting one")
        todoItem.value.author = useUserStore.user
        console.log("userStore.user: ", userStore.user)

        console.log("Todoitem: ", todoItem.value.author)
      }
      console.log("Todoitem: ", author)

      const item = {
        title: todoItem.value.title,
        category: todoItem.value.category,
        priority: todoItem.value.priority,
        completed: todoItem.value.completed,
        author: author || null,
        comments: []
      }

      console.log("The final item is: ", item);
      
      todoStore.addTodo(item)
      todoItem.value.title = ''
      console.log("-----------------------")
    }
</script>
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

.assignee {
  display: flex;
  flex: .5 1 0%;
}

.assignee-input {
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