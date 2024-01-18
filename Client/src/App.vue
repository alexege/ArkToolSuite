<script setup>
import { ref, onMounted, watch, computed} from 'vue'
import { useRouter, RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
// import { useAuthStore } from "./stores/auth.store"
import { useAuthStore } from "./stores/AuthStore"
import { useUserStore } from "./stores/user.store"
import Sidebar from '@/views/Sidebar.vue'

const router = useRouter()
// const { activeUser } = storeToRefs(useAuthStore())

const authStore = useAuthStore()
const userStore = useUserStore()

const showModBoard = ref(false);
const showAdminBoard = ref(false);

const { fetchUsers } = useUserStore()

fetchUsers()

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
// watch(activeUser, (newVal, oldVal) =>{
//   console.log(`old:${oldVal}, new:${newVal}`)
//   if(newVal && newVal.roles){
//     if(newVal.roles.includes('ROLE_ADMIN')){
//       showAdminBoard.value = true;
//     }
//     if(newVal.roles.includes('ROLE_MODERATOR')){
//       showModBoard.value = true;
//     }
//   }
// })

import { signOut, getAuth, onAuthStateChanged } from "firebase/auth"
const isLoggedIn = ref(false)

onMounted(() => {
    authStore.init()
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        isLoggedIn.value = true
      } else {
        isLoggedIn.value = false
      }
    })
  })

//Log User out
const handleSignOut = () => {
  signOut(getAuth()).then((res) => {
      console.log("signing out...", res)
      router.push("/")
    })
}

</script>

<template>
  <div class="app">

    <Sidebar />

    <main>

    <header class="navbar">
     <div>
       <nav>
        <div>
          <RouterLink class="router-link" to="/">Dashboard</RouterLink>
          <!-- <RouterLink class="router-link" to="/admin" v-if="showAdminBoard">Admin</RouterLink> -->
          <RouterLink class="router-link" to="/admin" v-if="showAdminBoard">Admin</RouterLink>

          <!-- <RouterLink class="router-link" to="/admin">Admin</RouterLink> - -->
          <RouterLink class="router-link" to="/mod" v-if="showModBoard">Moderator</RouterLink>
        </div>
        <RouterLink class="router-link" to="/user">User</RouterLink>

        <RouterLink class="router-link" to="/timers">Timers</RouterLink>
        <RouterLink class="router-link" to="/layouts">Layouts</RouterLink>
        <RouterLink class="router-link" to="/todo">TodoList</RouterLink>
        <RouterLink class="router-link" to="/map">Map/Scout</RouterLink>

        <div class="welcome-message" v-if="userStore.user">
          {{ welcomeMessage() }} {{ userStore.user.username }}
        </div>
        <div>
          <button @click="handleSignOut" v-if="isLoggedIn">
    				<!-- <span class="material-icons">timer</span> -->
            Sign Out
          </button>
          <RouterLink class="router-link" to="/auth" v-else>Login/Register</RouterLink>
        </div>
       </nav>
     </div>
   </header> 
 
   <RouterView class="router-view"/>
  </main>
</div>
</template>
<style lang="scss">
:root {
	--primary: #2d6f67;
	// --primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	// --dark: #1e293b;
	--dark: black;
	--dark-alt: #334155;
  --dark-black: black;
	--light: white;
	--sidebar-width: 300px;
}

.router-view {
  height: 100%;
  outline: 2px solid white;
}

* {
  font-family: 'Share Tech Mono', sans-serif;
}

body {
	background: var(--dark-black);
}

.router-view {
  padding: 1em;
}

.menu button, .menu-toggle-wrap button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;

	main {
		flex: 1 1 0;
		// padding: 2rem;
    overflow: hidden;

		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}

  .main {
    width: 100%;
  }
}
</style>
<style scoped>
  nav {
    display: flex;
    justify-content: space-between;
  }

  .navbar {
    display: flex;
    flex-direction: column;
    /* background-color: #42b883; */
    /* background-color: #2d6f67; */
    background-color: #041e27;
    padding: 1.2rem;
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