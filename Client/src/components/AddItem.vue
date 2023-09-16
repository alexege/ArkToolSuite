<template>
    <div class="container">
        <div class="item-box">
            <input type="text" v-model="item.title" placeholder="Title">
            <input type="text" v-model="item.url" placeholder="URL">
            <textarea name="description" cols="30" rows="10" v-model="item.description" placeholder="Description"></textarea>
            <button @click="add">Add</button>
        </div>
    </div>
</template>

<script setup>

import { ref } from "vue";
import { useItemStore } from '../stores/item';

const { addItem } = useItemStore()
const  item = ref ({
    title: '',
    url: '',
    description: '',
    gridPosition: null
});

async function add() {
    var data = {
        title: item.value.title,
        url: item.value.url,
        description: item.value.description,
        gridPosition: item.value.gridPosition
    }

    await addItem(data)
    .then(() => {
        // item.value.title = '';
        // item.value.url = '';
        // item.value.description = '';
    })
}

</script>
<style>
    .container {
        display: flex;
        justify-content: center;
    }

    .item-box {
        display: flex;
        flex-direction: column;
    }
</style>