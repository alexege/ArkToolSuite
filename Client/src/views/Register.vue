<template>
    <div>
        <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" />

        <form @submit.prevent="onRegister">
            <label for="username">Username</label>
            <input type="text" v-model="username">

            <label for="email">Email</label>
            <input type="text" v-model="email">

            <label for="password">password</label>
            <input type="text" v-model="password">

            <button>Register</button>
        </form>
    </div>
</template>
<script setup>

import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.store.js';

const { register } = useAuthStore();

const username = ref(null);
const password = ref(null);
const email = ref(null);

async function onRegister() {
    const userInfo = {
        username: username.value,
        password: password.value,
        email: email.value
    }

    await register(userInfo)
    .then(() => {
        console.log(`Regsitering with username: ${userInfo.username}`)
    })
    .catch((err) => console.log(err));


}
</script>