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
      return state.todoList;
    }
  },
  actions: {

    async fetchTodos() {
      try {
        const response = await axios.get(`${API_URL}/todo/all`);
        this.todoList = response.data

    } catch (error) {
        this.todoList = { error };
    }
    },

    async addTodo(item) {
      console.log("Adding todo in pinia", item);
        await axios.post(`${API_URL}/todo/addTodo`, item)
        this.todoList.push({ item, id: this.id++, completed: false })
    },

    deleteTodo(itemID) {
        this.todoList = this.todoList.filter((object) => {
          return object.id !== itemID
        })
      },

    toggleCompleted(idToFind) {
        const todo = this.todoList.find((obj) => obj.id === idToFind);
        if (todo) {
          todo.completed = !todo.completed;
        }
      },
  },
})