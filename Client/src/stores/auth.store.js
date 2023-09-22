import { defineStore } from 'pinia'
import axios from "axios"

const API_URL = 'http://localhost:8080/api'

export const useAuthStore = defineStore({
  id: 'Auth',
  state: () => ({
    users: [],
    user: null,
    loading: false,
    error: null
}),
getters: {
    activeUser: (state) => {
        return state.user;
    },

    allUsers: (state) => {
        return state.users;
    }
},
actions: {

    async login(loginData) {

        try {
            const response = await axios.post(`${API_URL}/auth/signin`, loginData)

            //Update pinia state
            this.user = response.data

            //Store JWT in local storage to keep user logged in between page changes
            localStorage.setItem('user', JSON.stringify(response))

            // router.push(this.returnURL || '/')
            this.router.push('/')
        } catch (e) {
            console.log("error:", e)
        }
    },

    async register(signUpData) {

        try {
            await axios.post(`${API_URL}/auth/signup`, signUpData)
            this.router.push('/')
        } catch (e) {
            console.log("error:", e)
        }
    },
    
    logout() {
        this.user = null;
        localStorage.removeItem('user')
        // router.push('/accounts/login')
    }
    }
})