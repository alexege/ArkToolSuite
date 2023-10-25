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
      <li class="label assignee" @click.prevent="sort('assignee')">
        Assignee
        <div v-if="sortBy === 'assignee'">
          <span v-if="sortDirection === 1" class="material-symbols-outlined">arrow_drop_up</span>
          <span class="material-symbols-outlined" v-else>arrow_drop_down</span>
        </div>
      </li>
      <li class="label action" @click.prevent="sort('completed')">
        Completed
        <!-- <div v-if="sortBy === 'completed'">
          <span v-if="sortDirection === 1" class="material-symbols-outlined">arrow_drop_up</span>
          <span class="material-symbols-outlined" v-else>arrow_drop_down</span>
        </div> -->
      </li>
    </ul>
    </div>
    <!-- <ul v-for="todo in todoList" :key="todo._id" class="list">
      <li class="item" v-if="todo"></li>
    </ul> -->

    <div class="list" v-for="todo, idx in sortedProperties" :key="todo._id">
      <div class="item" v-if="todo">
        <ul class="todo-items">
          <li class="label idx">{{ idx + 1 }}</li>
          <li class="label title" :class="{ completed: todo.completed }">{{ todo.title }}</li>
          <li class="label category">{{ todo.category }}</li>
          <li class="label created-at">{{ new Date(todo.createdAt).toLocaleString() }}</li>
          <li class="label priority" :class="todo.priority?.toLowerCase()">{{ todo.priority }}</li>
          <li class="label assignee">{{ todo.assignee?.username || 'assignee' }}</li>
          <li class="label action">
            <span @click.stop="toggleComp(todo)">&#10004;</span>
            <span @click="delTodo(todo._id)" class="x">&#10060;</span>
          </li>
        </ul>
      </div>
    </div>
    
    <h2>Completed</h2>
    <!-- <pre>{{ todoList}}</pre> -->
    <!-- Completed Items -->
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
      <li class="label assignee" @click.prevent="sort('assignee')">
        Assignee
        <div v-if="sortBy === 'assignee'">
          <span v-if="sortDirection === 1" class="material-symbols-outlined">arrow_drop_up</span>
          <span class="material-symbols-outlined" v-else>arrow_drop_down</span>
        </div>
      </li>
      <li class="label action" @click.prevent="sort('completed')">
        Completed
        <!-- <div v-if="sortBy === 'completed'">
          <span v-if="sortDirection === 1" class="material-symbols-outlined">arrow_drop_up</span>
          <span class="material-symbols-outlined" v-else>arrow_drop_down</span>
        </div> -->
      </li>
    </ul>
    <div class="list" v-for="todo, idx in completedItems" :key="todo._id">
      <div class="item" v-if="todo">
        <ul class="todo-items">
          <li class="idx">{{  idx + 1 }}</li>
          <li class="title" :class="{ completed: todo.completed }">{{ todo.title }}</li>
          <li class="category">{{ todo.category }}</li>
          <li class="created-at">{{ new Date(todo.createdAt).toLocaleString() }}</li>
          <li class="priority" :class="todo.priority?.toLowerCase()">{{ todo.priority }}</li>
          <li class="assignee">{{ todo.assignee?.username || 'assignee' }}</li>
          <li class="action">
            <span @click.stop="toggleComp(todo)">&#10004;</span>
            <span @click="delTodo(todo._id)" class="x">&#10060;</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- sorted: <pre>{{ sortedProperties }}</pre> <br /> -->
    <!-- sortDirection: {{ sortDirection }} <br /> -->
    <!-- sortBy: {{ sortBy }} -->

  </div>
  </template>
  
  <script setup>
  import { useTodoListStore } from "../../stores/todo.store.js";
  import { storeToRefs } from "pinia";
  import { ref, computed } from 'vue'
  const todoListStore = useTodoListStore();
  const { todoList, allTodos, completedItems } = storeToRefs(useTodoListStore());
  const { toggleCompleted, deleteTodo } = useTodoListStore();

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

  var sortedProperties = computed(() => {
    if(sortDirection.value){
      const direction = sortDirection.value
      const type = sortBy.value

      console.log(`direction:${direction}\ntype:${type}`)

      // console.log(`direction:${direction}, type:${type}`)
      if(Array.isArray(todoListStore.allTodos)){
        let copy = [...todoListStore.allTodos]

        if(type == 'priority'){
          var priorityOrder = { 'High':0, 'Medium':1, 'Low':2}
          if(sortDirection.value === 1){
            return copy.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
          } else {
            return copy.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
          }
        }

          //Generic Sort Selection
          return copy.sort(sortMethods(type, direction))
        }
      }
      return todoListStore.allTodos
  })

  var completed = computed(() => {
    if(Array.isArray(allTodos)){
      return allTodos.filter((todo) => todo.completed)
    }
    return allTodos
  })

  </script>
  
  <style scoped>

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
    display: flex;
    justify-content: center;
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

.actions {
  display: flex;
  flex: .5 1 0%;
}
  </style>