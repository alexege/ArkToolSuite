import { defineStore } from 'pinia'
import axios from "axios"

const API_URL = 'http://localhost:8080/api'

export const useTimerStore = defineStore({
  id: 'Timer',
  state: () => ({
    timers: [],
    timer: null,
    type: null,
    img: 'https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg',
    loading: false,
    error: null
  }),
  getters: {
    allTimers: (state) => {
        return state.timers;
    },

    allCountDownTimers: (state) => {
      return state.timers.filter(timer => timer.type == 'countDown')
    },
    
    allStopwatchTimers: (state) => {
      return state.timers.filter(timer => timer.type == 'stopWatch')
    },

    activeTimer: (state) => {
        if(state.timer){
            console.log(state.timer)
            return state.timer;
        }
    },
  },
  actions: {

    async selectTimer(id) {
        //The id is passed through the parameters
        const response = await axios.get(`${API_URL}/timers/findOne/${id}`)
        this.timer = response.data.timer;
    },

    async fetchTimers() {
      console.log("fetching all timers");
        this.timers = []
        const response = await axios.get(`${API_URL}/timers/all`)
        this.timers = response.data;
    },

    async addTimer(timer){
      console.log("adding a new timer");
        const newTimer = await axios.post(`${API_URL}/timers/add`, timer)
        this.timers.push(newTimer.data)
    },

    async updateTimer(updatedTimer) {
      console.log("updatedTimer")
      try {
        await axios.patch(`${API_URL}/timers/update/${updatedTimer._id}`, updatedTimer)
        
        let timerToUpdateIdx = this.timers.indexOf(this.timers.find((timer) => timer._id == updatedTimer._id));

        let merged = {
          ...this.timers[timerToUpdateIdx],
          ...updatedTimer
        }

        this.timers[timerToUpdateIdx] = merged;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async deleteTimer(id) {
        try {
            await axios.delete(`${API_URL}/timers/delete/${id}`)
            .then(() => {
              let index = this.timers.findIndex(timer => timer._id == id)
              this.timers.splice(index, 1)
            })
        } catch (error) {
            console.log("error:", error);
        }
    }
  }
})