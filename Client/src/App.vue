<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from "./stores/auth.store"

const { activeUser } = storeToRefs(useAuthStore())

</script>

<template>
  <div>
    <header class="navbar">
     <div>
       <nav>
        <div>
          <RouterLink to="/">Home</RouterLink> -
          <RouterLink to="/admin">Admin</RouterLink> -
          <RouterLink to="/login">Login</RouterLink> -
          <RouterLink to="/register">Register</RouterLink>
        </div>
         <div class="welcome-message" v-if="activeUser">
          Good morning, {{ activeUser.username }}
         </div>
       </nav>
     </div>
   </header> 
 
   <RouterView />
  </div>
</template>

<style>
  nav {
    display: flex;
    justify-content: space-between;
  }

  .navbar {
    background-color: #45906C;
    padding: 1.2rem;
    border-radius: 5px;
  }

  .navbar a {
    color: white;
    text-decoration: none;
  }

  .welcome-message {
    color: white;
  }

</style>