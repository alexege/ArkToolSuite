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
    allUsers: (state) => {
        return state.users;
    }
},
actions: {
    async login(loginData) {

        try {
            const user = await axios.post(`${API_URL}/auth/signin`, loginData)

            //Update pinia state
            this.user = user

            //Store JWT in local storage to keep user logged in between page changes
            localStorage.setItem('user', JSON.stringify(user))

            // router.push(this.returnURL || '/')
            this.router.push('/admin')
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