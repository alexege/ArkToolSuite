<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header class="navbar">
     <div>
       <nav>
         <RouterLink to="/">Home</RouterLink> -
         <RouterLink to="/admin">Admin</RouterLink>
       </nav>
     </div>
   </header> 
 
   <RouterView />
  </div>
</template>

<style>
  .navbar {
    background-color: #45906C;
    padding: 1.2rem;
    border-radius: 5px;
  }

  .navbar a {
    color: white;
    text-decoration: none;
  }
</style>