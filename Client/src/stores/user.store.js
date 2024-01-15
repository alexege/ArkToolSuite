import { defineStore } from 'pinia'
import axios from "axios"

const API_URL = 'http://localhost:8080/api'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        users: [],
        user: null
    }),
    getters: {
        allUsers(state) {
            return state.users;
        },
    },
    actions: {

        getActiveUser(user) {
            let uid = user.value._id;
            if (user.value._id) {
                if (Array.isArray(this.users)) {
                    this.user = this.users.filter(user => user._id == uid)[0]
                }
            }
        },

        async register(signUpData, username, password) {

            let data = {
                signUpData,
                username,
                password
            }

            try {
                await axios.post(`${API_URL}/users/signup`, data)
                .then((response) => {
                    this.user = response.data.user
                    this.users.push(response.data.user)
                    this.router.push('/')
                })
                .catch((e) => {
                    console.log("error: ", e)
                })
    
            } catch (e) {
                console.log("error:", e)
            }
        },

        async fetchUsers() {
            try {
                const response = await axios.get(`${API_URL}/users/all`);
                this.users = response.data

            } catch (error) {
                this.users = { error };
            }
        },
        async getById(id) {
            this.user = { loading: true };
            try {
                this.user = await axios.get(`${API_URL}/user/${id}`);
            } catch (error) {
                this.user = { error };
            }
        }
    }
})