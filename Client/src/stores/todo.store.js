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
    }
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
        if (index !== -1) {
          this.todos.splice(index, 1)
        }
      },

    async toggleCompleted(todo) {
      await axios.patch(`${API_URL}/todo/update/${todo._id}`, { completed: todo.completed })
        const todoItem = this.todos.find((obj) => obj._id === todo._id);
        if (todoItem) {
          todoItem.completed = !todoItem.completed;
        }
      },

      async addComment(commentId, comment, todoId) {

        let data = {
          commentId,
          comment,
          todoId
        }

        //Update State Values
          
          const response = await axios.post(`${API_URL}/todo/addComment/${todoId}`, data)
          const newComment = await response.data
          console.log("new Comment: ", newComment)

          const todo = this.todos.find((todo) => todo._id === todoId)

          const currentComment = todo.comments.find((comment) => comment._id === commentId)

          console.log("todo:", todo)
          console.log("currentComment:", currentComment)
          console.log("newComment:", newComment)

          todo.comments.push(newComment)
          
          //let currentComment = await todo.comments.find((comment) => comment._id === todoId)
  
          // if (currentComment) {
          //   await comment.comments.push(currentComment)
          // }

        },

        async deleteComment(id) {
          await axios.delete(`${API_URL}/comment/${id}`)
  
          // const index = this.comments.
  
          // let idx = this.todos.find
        }

      },


      //     async deleteTodo(id) {
//       await axios.delete(`${API_URL}/todo/${id}`)
//       let idx = this.todos.findIndex(todo => todo._id === id)
//       //Update State values
//       this.todos.splice(idx, 1)
//     },
  // },
  })