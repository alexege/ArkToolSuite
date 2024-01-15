<script setup>
import { watch, onMounted, computed } from 'vue'
import { useUserStore } from '../stores/user.store'
const { fetchUsers, getById } = useUserStore()
const userStore = useUserStore()
fetchUsers()

import { useAuthStore } from '../stores/AuthStore'
const authStore = useAuthStore()

const activeUser = computed(() => {
  console.log("active user is changing")
  return getById(authStore.user._id)
})

// onMounted(() => {
//   console.log("the id  of the user is: ", authStore.user._id)
//   if (authStore.user._id) {
//     getById(authStore.user._id)
//   }
// })

</script>

<template>
  <div>
    <div class="container">
      <pre>User:{{ userStore.user}}</pre><br /><br />
      <pre>AuthUser:{{ authStore.user }}</pre><br /><br />
      <label for="">All Users:</label>
      <ul>
        <li v-for="user in userStore.users" :key="user._id">
          <pre>{{ user.username }}</pre>
        </li>
      </ul>
      
    </div>
  </div>
</template>

<style scoped>

.title {
  text-align: center;
  color: white;
  font-size: 2em;
  margin: .25em;
  padding: .25em;
}

.container {
  
}
</style>
