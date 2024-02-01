import { defineStore } from 'pinia'
import axios from "axios"
import { useTodoStore } from '../stores/todo.store'
import { useUserStore } from '../stores/user.store'

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
        const response = await axios.get(`${API_URL}/comment/all`)
        this.setComments(response.data)
      } catch(error) {
        console.error(error)
      }
    },

    async addCommentToTodo(comment, todoId) {
      console.log(`[comment.store] - addCommentToTodo - comment: ${comment} , todoId: ${todoId}`)
      
      const response = await axios.post(`${API_URL}/comment/${todoId}`, comment)
      const newComment = response.data
      const todo = await useTodoStore().todos.find(todo => todo._id === todoId)
      
      if (todo) {
        await todo.comments.push(newComment)
        this.comments.push(newComment)
      }
    },

    async addComment(commentId, comment, todoId) {
      console.log(`[comment.store] - addComment - commentId: ${commentId} , comment: ${comment} , todoId: ${todoId}`)

      let data = { commentId, comment, todoId }
      const response = await axios.post(`${API_URL}/comment`, data)
      const newComment = response.data

      newComment.author = useUserStore().user
      console.log("this.comments:", this.comments)
      
      //Do we want the comments in pina to be nested or flat??

      const currentComment = this.comments.find((comment) => comment._id === commentId)
      console.log("currentComment: ", currentComment)
      currentComment.comments.push(newComment)

      this.comments.push(newComment)

      ////Should we choose to keep things nested, try this:
      // let storeComment = await this.comments.find(comment => comment._id === commentId)
      // if (storeComment) {
      //   storeComment.push(newComment)
      // }
      
      // const todo = await useTodoStore().todos.find(todo => todo._id === todoId)

      // const foundComment = todo.comments.find(comment => comment._id === commentId)
      // foundComment.comments.push(newComment)

      // await this.comments.push(newComment)

      // const currentComment = this.comments.find((comment) => comment._id === commentId)
      // currentComment.comments.push(newComment)

      // const todo = await useTodoStore().todos.find((todo) => todo._id === todoId)
      // console.log("a todo was found, here it is: todo: ", todo)

      // todo.comments.push(newComment._id)
      // todo.save()
      
    },

    async deleteComment(commentId, depth, parentId, todoId) {
      console.log("depth:", depth)
      console.log(`[comment.store] - deleteComment - commentId: ${commentId} , todoId: ${todoId}`)
      
      const todo = await useTodoStore().todos.find(todo => todo._id === todoId)

      let commentIndex = todo.comments.findIndex(comment => comment._id === commentId)
      if (commentIndex !== -1) {
        todo.comments.splice(commentIndex, 1)
      }
      this.comments = this.comments.filter(comment => comment._id !== commentId)

      axios.delete(`${API_URL}/comment/${commentId}`)

      if (depth == 1) {
        let todoCommentIndex = todo.comments.findIndex(comment => comment._id === commentId)
        console.log(`todoCommentIndex: ${todoCommentIndex}`)
        if (todoCommentIndex !== -1){
          todo.comments.splice(todoCommentIndex, 1)
        }
      } else {

        let commentIndex = this.comments.findIndex(comment => comment._id === commentId)
        console.log("commentIndex: ", commentIndex)
        if (commentIndex !== -1) {
          this.comments.splice(commentIndex, 1)
          // todo.comments = todo.comments.find(comment => comment)
          // todo.comments = [...todo.comments]

          let cmt = this.comments.find(comment => comment._id === parentId)
          console.log("cmt:", cmt)
          cmt.comments = []

        }
      }

      // console.log("comments: ", this.comments)

      // let index = this.comments.findIndex(comment => comment._id === commentId)
      // console.log("index:", index)
      // if (index !== -1) {
      //   this.comments.splice(index, 1)
      // } else {
      //   console.log("Comment not found in todo!")
      // }
    }
  }
})