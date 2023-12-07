<script setup>
import { useUserStore } from "../stores/user.store"
const { fetchUsers } = useUserStore()
const userStore = useUserStore()
fetchUsers()

const user = userStore.user;

import { useAuthStore } from '../stores/AuthStore'
const authStore = useAuthStore()

</script>

<template>
<div>
    <h2>User Dashboard</h2>
    {{ authStore.user }}
    <div v-if="user">
        <div>
            <img :src="user.img" alt="">
        </div>
        <div>
            <label for="Name">Name:</label>
            <span>{{ user.username }}</span>
        </div>
        <div>
            <label for="Email">Email:</label>
            <span>{{ user.email }}</span>
        </div>
        <label for="roles">Roles:</label>
        <ul>
            <li v-for="role in user.roles" :key="role">{{ role.name }}</li>
        </ul>
    </div>
</div>
</template>