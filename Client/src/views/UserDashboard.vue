<template>
<div>
    <h2>User Dashboard</h2>
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
            <li v-for="role in user.roles" :key="role">{{ role }}</li>
        </ul>
    </div>
</div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth.store.js"
const authStore = useAuthStore()

const user = authStore.user;

</script>