<template>
  <div>
    <h2 class="title">Moderator Dashboard</h2>
    <h3>User List:</h3>
    <ol>
      <li v-for="user in allUsers" :key="user._id">
        {{ user.username }} |
        {{ user.email }} | 
        <span v-for="role in user.roles" :key="role">{{ role.name }}</span>
      </li>
    </ol>
  </div>
</template>
  
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user.store.js'

const { allUsers } = storeToRefs(useUserStore())
const { fetchUsers } = useUserStore()

fetchUsers()

</script>
<style scoped>
  .title {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding: 25px;
  }
</style>