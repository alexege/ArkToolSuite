import { defineStore } from 'pinia'
import axios from "axios"

const API_URL = 'http://localhost:8080/api'

export const useLayoutStore = defineStore({
  id: 'Layout',
  state: () => ({
    layouts: [],
    layout: null,
    loading: false,
    error: null
  }),
  getters: {
    allLayouts: (state) => {
        return state.layouts;
    }
  },
  actions: {

    async selectLayout(id) {
        //The id is passed through the parameters
        const response = await axios.get(`${API_URL}/layouts/findOne/${id}`)
        this.layout = response.data.layout;
    },

    async fetchLayouts() {
        this.layouts = []
        const response = await axios.get(`${API_URL}/layouts/all`)
        this.layouts = response.data;
        // try {
        //     let layouts = axios.get(`${API_URL}/layouts/all`)
        //     this.layouts = (await layouts).data
        // } catch (error) {
        //     console.log('error:', error)
        // }
    },

    async addLayout(layout){
        await axios.post(`${API_URL}/layouts/addLayout`, layout)
        await this.fetchLayouts()
    },

    async updateLayout(layout) {
      try {
        await axios.patch(`${API_URL}/layouts/update/${layout._id}`, layout)
        await this.fetchLayouts()
      } catch (error) {
        console.log("error:", error);
      }
    },

    async update(layout) {
      try {
        await axios.patch(`${API_URL}/layouts/update/${layout._id}`)
        await this.fetchLayouts()
      } catch (error) {
        console.log("error:", error);
      }
    },

    async deleteLayout(id) {
        try {
            await axios.delete(`${API_URL}/layouts/delete/${id}`)
            await this.fetchLayouts()
        } catch (error) {
            console.log("error:", error);
        }
    }
  }
})