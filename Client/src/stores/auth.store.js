import { defineStore } from 'pinia'
import axios from "axios"
import tokenService from '../services/token.service';

const API_URL = 'http://localhost:8080/api'

export const useAuthStore = defineStore({
  id: 'Auth',
  state: () => ({
    users: [],
    // user: JSON.parse(localStorage.getItem('user')) || null,
    user: null,
    loggedIn: false,
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
            await axios.post(`${API_URL}/auth/signin`, loginData)
            .then((response) => {
                
                //Update pinia state
                this.user = response.data

                //Update TokenService
                tokenService.setUser(response.data);

                this.loggedIn = true;
                //Store JWT in local storage to keep user logged in between page changes
                localStorage.setItem('user', JSON.stringify(response.data))
    
    
    
                // router.push(this.returnURL || '/')
                this.router.push('/')
            })
        } catch (e) {
            console.log("error:", e)
        }
    },

    async register(signUpData) {

        try {
            await axios.post(`${API_URL}/auth/signup`, signUpData)
            .then((response) => {
                this.users.push(response.data)
                this.router.push('/')
            })

        } catch (e) {
            console.log("error:", e)
        }
    },
    
    logout() {
        console.log("atteempting to logout");
        this.user = null;
        this.loggedIn = false;
        localStorage.removeItem('user')
        // router.push('/accounts/login')
    },

    //Custom adding - not sure if necessary
    refreshToken(accessToken) {
        this.loggedIn = true;
        this.user = { ...this.user, accessToken };
    }
    }
})