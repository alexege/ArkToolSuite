<template>
    <div class="layout-container">
        <img :src="props.layout.url" alt="" v-if="props.layout.url">
        <img :src="'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png'" alt="" v-else>
        <label for="">{{ props.layout.title }}</label>
        <!-- <input type="text" v-model="title"> -->
    </div>
</template>
<script setup>
    const props = defineProps(['layout'])

</script>

<style scoped>
.layout-container {
    width: 100%;
    padding: 15px 5px;
    margin: 0 5px;
    /* border-radius: 0 0 5px 5px; */
    border-top: 2px solid white;
    background-color: rgb(63, 63, 63);
    display: flex;
}

.layout-container img {
    width: 50px;
    height: 50px;
}

.layout-container label {
    margin: 1em;
}
</style>