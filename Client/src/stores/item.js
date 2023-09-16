import { defineStore } from 'pinia'
import axios from "axios"

const API_URL = 'http://localhost:8080/api'

export const useItemStore = defineStore({
  id: 'Item',
  state: () => ({
    items: [],
    item: null,
    currentItem: null,
    loading: false,
    error: null
  }),
  getters: {
    allItems: (state) => {
        return state.items;
    }
  },
  actions: {
    async fetchItems() {
        this.items = []
        const response = await axios.get(`${API_URL}/items/all`)
        this.items = response.data;
        // try {
        //     let items = axios.get(`${API_URL}/items/all`)
        //     this.items = (await items).data
        // } catch (error) {
        //     console.log('error:', error)
        // }
    },

    async addItem(item){
        await axios.post(`${API_URL}/items/addItem`, item)
        await this.fetchItems()
    },

    async updateItem(item) {
      try {
        await axios.patch(`${API_URL}/items/update/${item._id}`, item)
        await this.fetchItems()
      } catch (error) {
        console.log("error:", error);
      }
    },

    async update(item) {
      try {
        await axios.patch(`${API_URL}/items/update/${item._id}`)
        await this.fetchItems()
      } catch (error) {
        console.log("error:", error);
      }
    }
  }
})