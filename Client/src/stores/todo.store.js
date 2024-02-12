import { defineStore } from 'pinia'
import axios from "axios"
import { useUserStore } from '../stores/user.store'
import { isReactive } from 'vue'

const API_URL = 'http://localhost:8080/api'

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [],
    comments: [],
    // id: 0,
  }),
  getters: {
    allTodos: (state) => {
      if(Array.isArray(state.todos)) return state.todos.filter((item) => item.completed == false); //This seems to omit the value of author for some reason
      return state.todos;
    },
    allComments: (state) => {
      return state.comments;
    }
  },
  actions: {

    async fetchTodos() {
      // this.todos = { loading: true }
      try {
        await axios.get(`${API_URL}/todo/allTodos`)
        .then((res) => {
          console.log("Todos:", this.todos)
          console.log("Fetching todos:", res.data)
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

      //Comments

      async fetchComments() {
        try {
          const response = await axios.get(`${API_URL}/comment/allComments`)
          this.comments = response.data
        } catch(error) {
          console.error(error)
        }
      },
  
      async addCommentToTodo(comment, todoId) {
        console.log(`[comment.store] - addCommentToTodo - comment: ${comment} , todoId: ${todoId}`)
        
        const response = await axios.post(`${API_URL}/comment/todo/${todoId}`, comment)
        const newComment = response.data
        const todo = await this.todos.find(todo => todo._id === todoId)
        
        this.comments.push(newComment)
        if (todo) {
          await todo.comments.push(newComment)
        }
      },
  
      async addCommentToComment(commentId, comment, todoId) {
        console.log(`[comment.store] - addCommentToComment - commentId: ${commentId} , comment: ${comment} , todoId: ${todoId}`)
  
        let data = { commentId, comment, todoId }
        const response = await axios.post(`${API_URL}/comment/${commentId}`, data)
        const newComment = response.data
  
        newComment.author = useUserStore().user
        this.comments.push(newComment)

        let currentComment = this.comments.find(comment => comment._id === commentId)

        if (currentComment) {
          currentComment.comments.push(newComment)
        }

        this.todos = useTodoStore().fetchTodos()
      },
  
      async deleteComment(commentId, depth, parentId, todoId) {

        console.log(`parentId: ${parentId}`)
        console.log(`commentId: ${commentId}`)

        if(parentId) {
          let baseComment = this.comments.find(comment => comment._id === parentId)
          let idx = baseComment.comments.findIndex(comment => comment._id === commentId)
          let updatedComment = baseComment.comments.splice(idx, 1)
          let res = await axios.delete(`${API_URL}/comment/${commentId}`)
          console.log("delte res:", res)

          this.fetchTodos()
          // this.todos = [...this.todos]

        } else {
          console.log("No comment id found. Getting rid of todo instead.")
          let baseTodo = this.todos.find(todo => todo._id === todoId)
          let idx = baseTodo.comments.findIndex(comment => comment._id === commentId)
          let updatedTodo = baseTodo.comments.splice(idx, 1)
          let res = await axios.delete(`${API_URL}/comment/${commentId}`)

          this.fetchTodos()
        }

        let commentIndex = this.comments.findIndex(comment => comment._id === commentId)

        if (commentIndex !== -1) {
          this.comments.splice(commentIndex, 1)
        }
        // this.comments = useTodoStore().fetchComments()
        // this.todos = [...this.todos]
      }

      // async deleteComment(commentId, depth, parentId, todoId) {
      //   console.log("depth:", depth)
      //   console.log(`[comment.store] - deleteComment - commentId: ${commentId} , todoId: ${todoId}`)
        
      //   const todo = await useTodoStore().todos.find(todo => todo._id === todoId)
  
      //   let commentIndex = todo.comments.findIndex(comment => comment._id === commentId)
      //   if (commentIndex !== -1) {
      //     todo.comments.splice(commentIndex, 1)
      //   }
      //   this.comments = this.comments.filter(comment => comment._id !== commentId)
  
      //   axios.delete(`${API_URL}/comment/${commentId}`)
  
      //   if (depth == 1) {
      //     let todoCommentIndex = todo.comments.findIndex(comment => comment._id === commentId)
      //     console.log(`todoCommentIndex: ${todoCommentIndex}`)
      //     if (todoCommentIndex !== -1){
      //       todo.comments.splice(todoCommentIndex, 1)
      //     }
      //   } else {
  
      //     let commentIndex = this.comments.findIndex(comment => comment._id === commentId)
      //     console.log("commentIndex: ", commentIndex)
      //     if (commentIndex !== -1) {
      //       this.comments.splice(commentIndex, 1)
      //       // todo.comments = todo.comments.find(comment => comment)
      //       // todo.comments = [...todo.comments]
  
      //       let cmt = this.comments.find(comment => comment._id === parentId)
      //       console.log("cmt:", cmt)
      //       cmt.comments = []
  
      //     }
      //   }
      // }

      
      

      },


      //     async deleteTodo(id) {
//       await axios.delete(`${API_URL}/todo/${id}`)
//       let idx = this.todos.findIndex(todo => todo._id === id)
//       //Update State values
//       this.todos.splice(idx, 1)
//     },
  // },
  })