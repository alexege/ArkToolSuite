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
            console.log("user:", user.value.uid);
            console.log("users:", this.users)
            let uid = user.value.uid;
            console.log("uid:", uid);
            if (user.value.uid) {
                if (Array.isArray(this.users)) {
                    return this.users.filter(user => user._id == uid)[0]
                }
            }
        },

        async register(signUpData, username, password) {
            console.log("::::::::::::::registering from user.store::::::::::", signUpData);

            let data = {
                signUpData,
                username,
                password
            }

            try {
                await axios.post(`${API_URL}/users/signup`, data)
                .then((response) => {
                    console.log("register response:", response);
                    this.user = response.data.user
                    // this.users.push(response.data)
                    this.users.push(response.data.user)
                    this.router.push('/')
                })
    
            } catch (e) {
                console.log("error:", e)
            }
        },

        async fetchUsers() {
            // this.users = { loading: true };
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