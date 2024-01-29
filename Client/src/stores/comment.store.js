import { defineStore } from 'pinia'
import axios from "axios"

import { useTodoStore } from '../stores/todo.store'

// const todoStore = useTodoStore()
const API_URL = 'http://localhost:8080/api'

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: []
  }),
  getters: {
    // getPostComments: (state) => {
    //   const postStore = usePostStore()
    //   return state.comments.filter((post) => post.postId === postStore.post.id)
    // }

  },
  actions: {

    setComments(comments) {
      this.comments = comments
    },

    async fetchComments() {
      try {
        const response = await this.axios.get(`${API_URL}/comment/all`)
        this.setComments(response.data)
      } catch(error) {
        console.error(error)
      }
    },

    async addCommentToTodo(comment, todoId) {
      
      const response = await axios.post(`${API_URL}/comment/${todoId}`, comment)
      const newComment = response.data

      // let author = 
      // newComment.author = 

      // console.log("newComment: ", newComment)

      //Can i update the todo from here?
      // const todoStore = useTodoStore()
      
      const todo = await useTodoStore().todos.find(todo => todo._id === todoId)
      console.log("todo:", todo)

      // this.comments.push(newComment)
      
      if (todo) {
        await todo.comments.push(newComment)
        this.comments.push(newComment)
      }

    },

    async addComment(commentId, comment, todoId) {

      console.log("Attempting to add a comment")
      let data = { commentId, comment, todoId }
      console.log("data:", data)
      const response = await axios.post(`${API_URL}/comment`, data)
      console.log("response: ", response)
      const newComment = response.data
      console.log("new comment: ", newComment)

      await this.comments.push(newComment)

      // const currentComment = this.comments.find((comment) => comment._id === commentId)
      // currentComment.comments.push(newComment)

      // const todo = await useTodoStore().todos.find((todo) => todo._id === todoId)
      // console.log("a todo was found, here it is: todo: ", todo)

      // todo.comments.push(newComment._id)
      // todo.save()
      
    },

    async deleteComment(commentId, todoId) {
      
      const response = await useTodoStore().todos.find(todo => todo._id === todoId)
      // let todo = response.data

      // let commentIndex = todo.comments.findIndex(comment => comment._id === commentId)
      // if (commentIndex !== -1) {
      //   todo.comments.splice(commentIndex, 1)
      // }

      await axios.delete(`${API_URL}/comment/${commentId}`)
      console.log("commentId:", commentId)
      let index = this.comments.findIndex(comment => comment._id === commentId)
      console.log("index:", index)
      if (index !== -1) {
        this.comments.splice(index, 1)
      }
    }
  }
})