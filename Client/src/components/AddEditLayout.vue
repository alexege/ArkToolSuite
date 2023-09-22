<template>
    <div class="layout-container">
        <img :src="props.layout.url" alt="" v-if="props.layout.url">
        <img :src="'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png'" alt="" v-else>
        <label for="">{{ props.layout.title }}</label>
        <!-- <input type="text" v-model="title"> -->
        <div class="container-actions">
            <button>Edit</button>
            <button @click="deleteThisLayout(props.layout._id)">Delete</button>
        </div>
    </div>
</template>
<script setup>
    import { useLayoutStore } from "../stores/layout.store.js"

    const { deleteLayout } = useLayoutStore();
    const props = defineProps(['layout'])

    async function deleteThisLayout(id) {
        deleteLayout(id)
    }
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

.container-actions{
    display: flex;
    align-items: center;
    flex: 1;
}

.container-actions button {
    width: 50%;
    height: 100%;
    background-color: transparent;
    color: white;
    border: 2px solid white;
    margin: .25em;
}
</style>