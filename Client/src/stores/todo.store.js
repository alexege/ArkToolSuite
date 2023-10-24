import { defineStore } from 'pinia'
import axios from "axios"

const API_URL = 'http://localhost:8080/api'

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todoList: [],
    id: 0,
  }),
  getters: {
    allTodos: (state) => {
      if(Array.isArray(state.todoList)) return state.todoList.filter((item) => item.completed == false);
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
        this.todoList = response.data

      } catch (error) {
          this.todoList = { error };
      }
    },

    async addTodo(item) {
      if(item.assignee){
        const todoItem = await axios.post(`${API_URL}/todo/addTodo`, item)
        await this.todoList.push(todoItem.data)
      }
    },

    async deleteTodo(todoId) {
        await axios.delete(`${API_URL}/todo/delete/${todoId}`)
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
  },
})