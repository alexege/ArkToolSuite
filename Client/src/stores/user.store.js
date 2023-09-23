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
        }
    },
    actions: {
        async fetchUsers() {
            // this.users = { loading: true };
            try {
                // this.users = await axios.get(`${API_URL}/users/all`);
                const response = await axios.get(`${API_URL}/users/all`);

                this.users = response.data

            } catch (error) {
                this.users = { error };
            }
        },
        // async getById(id) {
        //     this.user = { loading: true };
        //     try {
        //         this.user = await fetchWrapper.get(`${baseUrl}/${id}`);
        //     } catch (error) {
        //         this.user = { error };
        //     }
        // },
        // async update(id, params) {
        //     await fetchWrapper.put(`${baseUrl}/${id}`, params);

        //     // update stored user if the logged in user updated their own record
        //     const authStore = useAuthStore();
        //     if (id === authStore.user.id) {
        //         // update local storage
        //         const user = { ...authStore.user, ...params };
        //         localStorage.setItem('user', JSON.stringify(user));

        //         // update auth user in pinia state
        //         authStore.user = user;
        //     }
        // },
        // async delete(id) {
        //     // add isDeleting prop to user being deleted
        //     this.users.find(x => x.id === id).isDeleting = true;

        //     await fetchWrapper.delete(`${baseUrl}/${id}`);

        //     // remove user from list after deleted
        //     this.users = this.users.filter(x => x.id !== id);

        //     // auto logout if the logged in user deleted their own record
        //     const authStore = useAuthStore();
        //     if (id === authStore.user.id) {
        //         authStore.logout();
        //     }
        // }
    }
})