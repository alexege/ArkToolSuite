import { defineStore } from 'pinia'
import axios from "axios"

// import { useTodoStore } from '../stores/todo.store'

// const todoStore = useTodoStore()
const API_URL = 'http://localhost:8080/api'

export const useCommentStore = defineStore({
  id: 'comment',
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
        console.error(error.response.data.message)
      }
    },

    async addComment(id, comment, todoId) {
      let data = { id, comment, todoId }

      const response = await axios.post(`${API_URL}/comment/${todoId}`, data)

      const newComment = await response.data
      // const todo = await todoStore.todos.find((todo) => todo._id === todoId)
      // console.log("a todo was found, here it is: todo: ", todo)

      // if (todoId) {
      //   //Todo
      // } else {
      //   await todo.comments.push(newComment)
      // }

    },

    async deleteComment(commentId) {
      const index = this.comments.findIndex(comment => comment._id === commentId)

      if (index !== -1) {
        this.comments.splice(index, 1)
      }
    }
  }
})