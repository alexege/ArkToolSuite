<template>
    <div class="login-box">

        <!-- Profile Icon -->
        <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Empty Profile Picture">
        
        <form @submit.prevent="doLogin" class="login-form">

            <label for="username">Username</label>
            <input type="text" v-model="username">
    
            <label for="password">Password</label>
            <input type="password" v-model="password">
    
            <button>Login</button>
            <router-link to="/register">Create Account</router-link>
        </form>
    </div>
</template>
<script setup>

    import { ref } from 'vue';
    import { useAuthStore } from '../stores/auth.store'

    const { login } = useAuthStore()
    const username = ref(null);
    const password = ref(null);

    async function doLogin() {
        const loginInfo = {
            username: username.value,
            password: password.value
        }

        await login(loginInfo)
        .then(() => {
            console.log(`logging in with username: ${loginInfo.username}`)
        })
        .catch((err) => console.log("error:", err))
    }
</script>
<style scoped>
.login-box {
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

.login-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 2em;
}

.login-form input[type=text], .login-form input[type=password] {
    padding: 12px 20px;
    margin: 8px 0;
}

.login-form button {
    cursor: pointer;
    height: 3em;
    margin: 8px 0;
    border: none;
    background-color: #04AA6D;
    color: white;
}

.login-form label, .login-form input {
    width: 100%;
}

.login-box img {
    width: 15em;
    border-radius: 50%;
}
</style>