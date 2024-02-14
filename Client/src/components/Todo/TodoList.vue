<script setup>

  import { ref, computed } from 'vue'
  import { storeToRefs } from "pinia";
  import { useUserStore } from "../../stores/user.store"
  import { useTodoStore } from "../../stores/todo.store"
  import Comment from '../Todo/Comment.vue'
  
  const userStore = useUserStore()
  const { fetchUsers } = useUserStore()
  const todoStore = useTodoStore()
  const { allTodos } = storeToRefs(useTodoStore())
  const { toggleCompleted, deleteTodo } = useTodoStore()
  const { fetchComments, addCommentToTodo, addCommentToComment } = useTodoStore()

  fetchUsers()
  fetchComments()

  const comment = ref({
    body: null,
    author: userStore.user ? userStore.user : null,
    comments: []
  })

  const addACommentToTodo = (todoId) => {
    addCommentToTodo(comment.value, todoId)
    comment.value.body = null
  }

  const addACommentToComment = () => {
    addCommentToComment(comment.value, todoId)
  }

  function toggleComp(todo) {
    toggleCompleted(todo)
  }

  function delTodo(id) {
    deleteTodo(id)
  }

  // Sort order
  const sortBy = ref('')
  var sortDirection = ref(1)

  function sort(type) {
    if(sortBy.value != type) sortDirection.value = 1
    sortBy.value = type
    sortDirection.value *= -1
  }

  function sortMethods(type, direction) {
    return direction === 1
        ? (a, b) => (b[type] > a[type] ? -1 : a[type] > b[type] ? 1 : 0)
        : (a, b) => (a[type] > b[type] ? -1 : b[type] > a[type] ? 1 : 0);
  }

  // const { allTodos } = storeToRefs(todoStore)

  var sortedProperties = computed(() => {
    if(sortDirection.value){
      const direction = sortDirection.value
      const type = sortBy.value

      if(Array.isArray(todoStore.allTodos)){
        let copy = [...todoStore.allTodos]

        if(type == 'priority'){
          var priorityOrder = { 'High':0, 'Medium':1, 'Low':2}
          if(sortDirection.value === 1){
            return copy.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
          } else {
            return copy.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
          }
        }

        // if(type == 'assignee'){
        //   return copy.sort((a, b) => a.assignee.username - b.assignee.username)
        // }

          //Generic Sort Selection
          return copy.sort(sortMethods(type, direction))
        }
      }
      return todoStore.allTodos
      // return []
  })

  //Sort Completed Items
  var sortByCompleted = ref('')
  var sortDirectionCompleted = ref(1)

  function sortCompleted(type) {
    if(sortByCompleted.value != type) sortDirectionCompleted.value = 1
    sortByCompleted.value = type
    sortDirectionCompleted.value *= -1
  }

  var sortedCompletedProperties = computed(() => {
    if(sortDirectionCompleted.value){
      const direction = sortDirectionCompleted.value
      const type = sortByCompleted.value

      if(Array.isArray(todoStore.completedItems)){
        let copy = [...todoStore.completedItems]

        if(type == 'priority'){
          var priorityOrder = { 'High':0, 'Medium':1, 'Low':2}
          if(sortDirectionCompleted.value === 1){
            return copy.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
          } else {
            return copy.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
          }
        }

          //Generic Sort Selection
          return copy.sort(sortMethods(type, direction))
        }
      }
      return todoStore.completedItems
  })

  var completed = computed(() => {
    if(Array.isArray(allTodos)){
      return allTodos.filter((todo) => todo.completed)
    }
    return allTodos
  })

  </script>

<template>
  <div>
    <div>
      <ul class="todo-labels">
      <li class="label idx">idx</li>
      <li class="label title" @click.prevent="sort('title')">
        Task Title
        <div v-if="sortBy === 'title'">
          <span v-if="sortDirection === 1" class="material-symbols-outlined">arrow_drop_up</span>
          <span class="material-symbols-outlined" v-else>arrow_drop_down</span>
        </div>
      </li>
      <li class="label category" @click.prevent="sort('category')">
        Category
        <div v-if="sortBy === 'category'">
          <span v-if="sortDirection === 1" class="material-symbols-outlined">arrow_drop_up</span>
          <span class="material-symbols-outlined" v-else>arrow_drop_down</span>
        </div>
      </li>
      <li class="label created-at" @click.prevent="sort('createdAt')">
        Created
        <div v-if="sortBy === 'createdAt'">
          <span v-if="sortDirection === 1" class="material-symbols-outlined">arrow_drop_up</span>
          <span class="material-symbols-outlined" v-else>arrow_drop_down</span>
        </div>
      </li>
      <li class="label priority" @click.prevent="sort('priority')">
        Priority
        <div v-if="sortBy === 'priority'">
          <span v-if="sortDirection === 1" class="material-symbols-outlined">arrow_drop_up</span>
          <span class="material-symbols-outlined" v-else>arrow_drop_down</span>
        </div>
      </li>
      <li class="label priority" @click.prevent="sort('author')">
        Author
        <div v-if="sortBy === 'author'">
          <span v-if="sortDirection === 1" class="material-symbols-outlined">arrow_drop_up</span>
          <span class="material-symbols-outlined" v-else>arrow_drop_down</span>
        </div>
      </li>
      <li class="label assignee" @click.prevent="sort('assignee')">
        Assignee
        <div v-if="sortBy === 'assignee'">
          <span v-if="sortDirection === 1" class="material-symbols-outlined">arrow_drop_up</span>
          <span class="material-symbols-outlined" v-else>arrow_drop_down</span>
        </div>
      </li>
      <li class="label action">
        Completed
      </li>
    </ul>
    </div>

    <div class="list" v-for="todo, idx in sortedProperties" :key="todo._id">
      <div class="item" v-if="todo">
        <ul class="todo-items">
          <li class="label idx">{{ idx + 1 }}</li> {{ todo._id.slice(-3) }}
          <li class="label title" :class="{ completed: todo.completed }">{{ todo.title }}</li>
          <li class="label category">{{ todo.category }}</li>
          <li class="label created-at">{{ new Date(todo.createdAt).toLocaleString() }}</li>
          <li class="label priority" :class="todo.priority?.toLowerCase()">{{ todo.priority }}</li>
          <li class="label author">{{ todo.author ? todo.author.username : null}}</li>
          <li class="label action">
            <span @click.stop="toggleComp(todo)">&#10004;</span>
            <span @click="delTodo(todo._id)" class="x">&#10060;</span>
          </li>
        </ul>

      </div>

        <ul v-for="(comment, index) in todo.comments" :key="index" class="comments-container">
          <Comment v-bind="{ comment }" :depth="0" :todoId="todo._id" />
        </ul>
        
        <div class="add-comment">
          <textarea cols="30" rows="10" placeholder="Add a Comment" v-model="comment.body"></textarea>
          <button @click="addACommentToTodo(todo._id)">Add</button>
        </div>

    </div>
  </div>
  </template>
    
  <style scoped>
  .comments-container {
    display: flex;
  }

  .low {
    color: green;
  }

  .medium {
    color: yellow;
  }

  .high {
    color: red;
  }


  span {
    margin: 0 10px;
    cursor: pointer;
  }

  .completed {
    text-decoration: line-through;
  }
  
  .list {
    /* display: flex; */
    /* justify-content: center; */
    outline: 1px solid cyan;
    margin: 20px 0;
    box-shadow: 2px 2px 6px cyan;
    background-color: rgba(8, 28, 36, 0.5)
  }
  
  .item {
    display: flex;
    /* font-size: 1.5em; */
    /* justify-content: space-between; */
    justify-content: space;
    width: 100%;
    padding: 5px;
  }

.todo-labels {
  display: flex;
  list-style: none;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
  /* font-size: 1.5em; */
  gap: .5em;
  cursor: pointer;
}

.todo-labels .label {
  border-bottom: 2px solid cyan;
  border-right: 2px solid cyan;
}

.todo-items {
  display: flex;
  list-style: none;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
  /* font-size: 1.5em; */
  gap: .5em;
}

.idx {
  display: flex;
  flex: .25 1 0%;
}

.title {
  display: flex;
  flex: 2.5 1 0%;
}

.category {
  display: flex;
  flex: .5 1 0%;
}

.created-at {
  display: flex;
  flex: .5 1 0%;
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

.add-comment {
  display: flex;
}
.add-comment textarea {
  flex: 3;
  height: 2em;
}
  </style>