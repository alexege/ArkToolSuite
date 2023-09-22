<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from "./stores/auth.store"

const { activeUser } = storeToRefs(useAuthStore())
const { logout } = useAuthStore()

function doLogout() {
  logout()
}

function welcomeMessage() {
  var data = [
    [22, 'Working late are we, '],
    [18, 'Good evening, '],
    [12, 'Good afternoon, '],
    [5,  'Good morning, '],
    [0,  'The early bird catches the worm, ']
],
  hr = new Date().getHours();

  for (var i = 0; i < data.length; i++) {
      if (hr >= data[i][0]) {
          return data[i][1]
      }
  }

}

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
          {{ welcomeMessage() }} {{ activeUser.username }}
          
          <button @click="doLogout">Logout</button>
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