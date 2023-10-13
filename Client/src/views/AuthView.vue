<template>
    <div class="login-box">
      <div class="page-header">{{ formTitle }}</div>
        <!-- Profile Icon -->
        <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Empty Profile Picture">
        
        <form @submit.prevent="doLogin" class="login-form">

            <label for="email">email</label>
            <input type="email" v-model="credentials.email">
    
            <label for="password">Password</label>
            <input type="password" v-model="credentials.password">
    
            <button>{{ formTitle }}</button>
            <button @click.prevent="signInWithGoogle">Sign in with google</button>
            <!-- <router-link to="/register">Create Account</router-link> -->
        </form>
        <p v-if="register">Already have an account? <a @click.prevent="register = false">Login</a></p>
        <p v-else><a @click.prevent="register = true">Register</a></p>
    </div>
</template>
  
  <script setup>
    import { computed, reactive, ref } from 'vue';
    import { useAuthStore } from '../stores/AuthStore';
  
    const register = ref(false);
  
    const authStore = useAuthStore();
  
    const credentials = reactive({
      email: '',
      password: ''
    });
  
    const formTitle = computed(() => {
      return register.value ? 'Register' : 'Login';
    });
  
    const doLogin = () => {
      if (!credentials.email || !credentials.password) {
        alert('Please enter email and password');
        return;
      }
  
      if (register.value) {
        authStore.registerUser(credentials);
      } else {
        authStore.loginUser(credentials);
      }
    };

    const signInWithGoogle = () =>{
      authStore.googleSignin();
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
  
  .login-form input[type=text], .login-form input[type=email], .login-form input[type=password] {
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
  