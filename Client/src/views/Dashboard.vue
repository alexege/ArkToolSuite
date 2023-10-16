<script setup>
import { useUserStore } from '../stores/user.store'
const { fetchUsers } = useUserStore()
const userStore = useUserStore()
fetchUsers()

import { useAuthStore } from '../stores/AuthStore'
const authStore = useAuthStore()

</script>

<template>
  <div>
    <div class="container">
      <h2>{{ authStore.user }}</h2>
      <pre>{{ userStore.users }}</pre>
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
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-rows: auto;
  /* outline: 1px solid red; */
}
</style>
