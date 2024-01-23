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

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [],
    id: 0,
  }),
  getters: {
    allTodos: (state) => {
      // if(Array.isArray(state.todos)) return state.todos.filter((item) => item.completed == false); //This seems to omit the value of author for some reason
      return state.todos;
    },

    // completedItems: (state) => {
    //   if(Array.isArray(state.todos)) return state.todos.filter((item) => item.completed == true);
    // },

    // getTodoComments: (state) => {
    //   return state.comments.filter((post) => post._id === todo._id)
    // }
  },
  actions: {

    async fetchTodos() {
      // this.todos = { loading: true }
      try {
        await axios.get(`${API_URL}/todo/all`)
        .then((res) => {
          this.todos = res.data
        })
      } catch (error) {
        console.log("error:", error)
          // this.todos = { error };
      }
    },

    async getById(id) {
      this.todo = { loading: true }
      try {
        this.todo = await axios.get(`${API_URL}/todo/${id}`)
      } catch (error) {
        this.todo = { error }
      }
    },

    async addTodo(item) {
        const todoItem = await axios.post(`${API_URL}/todo/addTodo`, item)
        await this.todos.push(todoItem.data)
    },

    async deleteTodo(todoId) {
        await axios.delete(`${API_URL}/todo/${todoId}`)
        let index = this.todos.findIndex(todo => todo._id === todoId)
        this.todos.splice(index, 1)
        // this.todos = this.todos.filter((object) => {
        //   return object.id !== todoId
        // })
      },

    async toggleCompleted(todo) {
      await axios.patch(`${API_URL}/todo/update/${todo._id}`, { completed: todo.completed })
        const todoItem = this.todos.find((obj) => obj._id === todo._id);
        if (todoItem) {
          todoItem.completed = !todoItem.completed;
        }
      },

      async addComment(id, comment) {
        console.log("addComment - todo.store", comment)
        const response = await axios.post(`${API_URL}/todo/addComment/${id}`, comment) 
        
        //Update State Values
        let todo = this.todos.find((todo) => todo._id === id)
        if (todo) {
          await todo.comments.push(response.data)
        }
      },
  },
})