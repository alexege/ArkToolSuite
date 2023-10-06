<script setup>
import { ref, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from "./stores/auth.store"
import EventBus from './common/EventBus'


const { activeUser } = storeToRefs(useAuthStore())
const { logout } = useAuthStore()

const showModBoard = ref(false);
const showAdminBoard = ref(false);

function doLogout() {
  logout()
  
  //Added for JWT Refresh
  this.$router.push('/')
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

//Having issues with activeUser updating properly. Will revisit to attempt to use a computed for this.
watch(activeUser, (newVal, oldVal) =>{
  console.log(`old:${oldVal}, new:${newVal}`)
  if(newVal && newVal.roles){
    if(newVal.roles.includes('ROLE_ADMIN')){
      showAdminBoard.value = true;
    }
    if(newVal.roles.includes('ROLE_MODERATOR')){
      showModBoard.value = true;
    }
  }
})


</script>

<template>
  <div>
    <header class="navbar">
     <div>
       <nav>
        <div>
          <RouterLink class="router-link" to="/">Home</RouterLink>
          <!-- <RouterLink class="router-link" to="/admin" v-if="showAdminBoard">Admin</RouterLink> -->
          <RouterLink class="router-link" to="/admin" v-if="showAdminBoard">Admin</RouterLink>

          <!-- <RouterLink class="router-link" to="/admin">Admin</RouterLink> - -->
          <RouterLink class="router-link" to="/mod" v-if="showModBoard">Moderator</RouterLink>
          <RouterLink class="router-link" to="/user">User</RouterLink>
        </div>

        <RouterLink class="router-link" to="/timers">Timers</RouterLink>
        <RouterLink class="router-link" to="/todo">TodoList</RouterLink>

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
<style scoped>
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