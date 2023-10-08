<template>
    <div class="register-box">
        <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Empty Profile Picture">

        <form @submit.prevent="onRegister" class="register-form">
            <label for="username">Username</label>
            <input type="text" v-model="username">

            <label for="email">Email</label>
            <input type="text" v-model="email">

            <label for="password">Password</label>
            <input type="password" v-model="password">

            <button>Register</button>
            <router-link to="/login">Login</router-link>
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
        email: email.value,
        img: 'https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg'
    }

    await register(userInfo)
    .then(() => {
        console.log(`Regsitering with username: ${userInfo.username}`)
    })
    .catch((err) => console.log(err));


}
</script>
<style scoped>
.register-box {
    color: white;
    width: 50%;
    height: 50%;
    margin: 2em auto;
    padding: 2em;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1em;
}

.register-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 2em;
}

.register-form input[type=text], .register-form input[type=password] {
    padding: 12px 20px;
    margin: 8px 0;
}

.register-form button {
    cursor: pointer;
    height: 3em;
    margin: 8px 0;
    border: none;
    background-color: #04AA6D;
    color: white;
}

.register-form label, .register-form input {
    width: 100%;
}

.register-box img {
    width: 15em;
    border-radius: 50%;
}
</style>