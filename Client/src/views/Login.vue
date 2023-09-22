<template>
    <div>
        
        <!-- Profile Icon -->
        <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="Empty Profile Picture">
        
        <form @submit.prevent="doLogin">

        <!-- User input fields -->
        <label for="username">Username</label>
        <input type="text" v-model="username">

        <label for="password">Password</label>
        <input type="text" v-model="password">

        <button>Login</button>

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