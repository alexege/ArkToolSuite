<script setup>
import SideNav from "./SideNav.vue"
import SidePanel from "./SidePanel.vue"
import ItemGrid from "./ItemGrid.vue"
</script>

<template>
  <div>
    <p class="title">Item Layout</p>
    <div class="container">
      <SideNav/>
      <ItemGrid />
      <SidePanel/>
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
