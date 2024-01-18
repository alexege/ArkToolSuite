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
                    let index = this.users.findIndex(user => user._id == uid)
                    if (index !== -1) {
                        this.user = this.users[index]
                    } else {
                        console.log("User not found in user store")
                    }
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
    },

    // if (localStorage.getItem("user")) {
    //     user.value = JSON.parse(localStorage.getItem("user"))
    // }

    // watch(user,
    //     (userVal) => {
    //         localStorage.setItem("user", JSON.stringify(userVal))
    // }, { deep: true }
    // )
})