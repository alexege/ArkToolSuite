// import { defineStore } from 'pinia'
// import axios from "axios"
// const API_URL = 'http://localhost:8080/api'
// export const usetodoStore = defineStore('todos', {
//   state: () => ({
//     todo: null,
//     todos: [],
//     id: 0,
//   }),
//   getters: {
//     allTodos: (state) => {
//       if(Array.isArray(state.todos)) return state.todos.filter((item) => item.completed == false);
//       return state.todos;
//     },
//     completedItems: (state) => {
//       if(Array.isArray(state.todos)) return state.todos.filter((item) => item.completed == true);
//     }
//   },
//   actions: {
//     async fetchTodos() {
//       this.todos = { loading: true };
//       try {
//         this.todos = await axios.get(`${API_URL}/todo/all`)
//       } catch (error) {
//         this.todos = { error }
//       }
//     },
//     async getById(id) {
//       this.todo = { loading: true }
//       try {
//         this.todo = await axios.get(`${API_URL}/todo/${id}`)
//       } catch (error) {
//         this.todo = { error }
//       }
//     },
//     async addTodo(todo) {
//       console.log("Adding a todo via todo.store", todo)
//       if (todo.author) {
//         const response = await axios.post(`${API_URL}/todo/addTodo`, todo)
//         //Update State values
//         this.todos.push(response.data)
//       }
//     },
//     async deleteTodo(id) {
//       await axios.delete(`${API_URL}/todo/${id}`)
//       let idx = this.todos.findIndex(todo => todo._id === id)
//       //Update State values
//       this.todos.splice(idx, 1)
//     },
//     async deleteAll() {
//       let response = await axios.delete(`${API_URL}/todo`)
      
//       //Update State values
//       if (response) {
//         this.todos = []
//       }
//     },
//     async updateTodo(id, params) {      
//       let todo = await axios.put(`${API_URL}/todo/update/${id}`, params)
//       const index = this.todos.findIndex(todo => todo._id === id)
//       //Update State values
//       if (index !== -1) {
//         this.todos.splice(index, 1, todo)
//       }
//     },
//     // async toggleCompleted(todo) {
//     //   await axios.patch(`${API_URL}/todo/update/${todo._id}`, { completed: todo.completed })
//     //     const todoItem = this.todos.find((obj) => obj._id === todo._id);
        
//     //     //Update State values
//     //     if (todoItem) {
//     //       todoItem.completed = !todoItem.completed;
//     //     }
//     //   },
//     // async addComment(id, comment) {
//     //   const response = await axios.post(`${API_URL}/todo/addComment/${id}`, comment)
//     //   //Update State values
//     //   let todo = this.todos.find((todo) => todo._id === id)
//     //   if (todo) {
//     //     todo.comments.push(response.data)
//     //   }
//     // },
//   },
// })


import { defineStore } from 'pinia'
import axios from "axios"

const API_URL = 'http://localhost:8080/api'

export const useTodoStore = defineStore('todoList', {
  state: () => ({
    todoList: [],
    id: 0,
  }),
  getters: {
    allTodos: (state) => {
      if(Array.isArray(state.todoList)) return state.todoList.filter((item) => item.completed == false); //This seems to omit the value of author for some reason
      return state.todoList;
    },

    completedItems: (state) => {
      if(Array.isArray(state.todoList)) return state.todoList.filter((item) => item.completed == true);
    }
  },
  actions: {

    async fetchTodos() {
      try {
        this.todoList = { loading: true }
        const response = await axios.get(`${API_URL}/todo/all`);
        console.log("FetchTodosReturns: ", response.data)
        this.todoList = response.data

      } catch (error) {
          this.todoList = { error };
      }
    },

    async addTodo(item) {
      console.log("adding a todo item")
      if(item.author){ //Only post if an author is found/exists
        const todoItem = await axios.post(`${API_URL}/todo/addTodo`, item)
        await this.todoList.push(todoItem.data)
      }
    },

    async deleteTodo(todoId) {
        await axios.delete(`${API_URL}/todo/${todoId}`)
        let index = this.todoList.findIndex(todo => todo._id === todoId)
        this.todoList.splice(index, 1)
        // this.todoList = this.todoList.filter((object) => {
        //   return object.id !== todoId
        // })
      },

    async toggleCompleted(todo) {
      await axios.patch(`${API_URL}/todo/update/${todo._id}`, { completed: todo.completed })
        const todoItem = this.todoList.find((obj) => obj._id === todo._id);
        if (todoItem) {
          todoItem.completed = !todoItem.completed;
        }
      },

      async addComment(id, comment) {
        const response = await axios.post(`${API_URL}/todo/addComment/${id}`, comment) 
        
        //Update State Values
        let todo = this.todoList.find((todo) => todo._id === id)
        if (todo) {
          todo.comments.push(response.data)
        }
      },
  },
})