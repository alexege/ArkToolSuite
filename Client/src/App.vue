<script setup>
import { computed } from 'vue'
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

const showModBoard = computed(() => {
  if (activeUser && activeUser.roles) return activeUser.roles.includes('ROLE_MODERATOR');
})

const showAdminBoard = computed(() => {
  if (activeUser && activeUser.roles) return activeUser.roles.includes('ROLE_ADMIN');
})

</script>

<template>
  <div>
    <header class="navbar">
     <div>
       <nav>
        <div>
          <RouterLink class="router-link" to="/">Home</RouterLink>
          <RouterLink class="router-link" to="/admin" v-if="showAdminBoard">Admin</RouterLink>

          <!-- <RouterLink class="router-link" to="/admin">Admin</RouterLink> - -->
          <RouterLink class="router-link" to="/mod" v-if="showModBoard">Moderator</RouterLink>
          <RouterLink class="router-link" to="/user">User</RouterLink>
        </div>

        <div>
          <div class="welcome-message" v-if="activeUser">
            {{ welcomeMessage() }} {{ activeUser.username }}
            <a href="" style="outline: 1px solid white; padding: .5em" @click="doLogout">Logout</a>
          </div>
          <RouterLink class="router-link" to="/login" v-if="!activeUser">Login </RouterLink>
          <RouterLink class="router-link" to="/register" v-if="!activeUser">Register</RouterLink>
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

  .router-link {
    padding-right: 20px;
  }
</style>