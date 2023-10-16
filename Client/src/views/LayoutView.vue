<script setup>
import ItemGrid from "./ItemGrid.vue"
import SideNav from "./SideNav.vue"
import SidePanel from "./SidePanel.vue"

</script>
<template>
    <div>
        <div class="container">
            <SideNav/>
            <ItemGrid />
            <SidePanel/>
        </div>
    </div>
</template>
<style scoped>
.container {
    display: grid;
    grid-template-columns: 25% 50% 25%;
    grid-template-rows: auto;
}
</style>