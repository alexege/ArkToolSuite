<template>
    <div>
        <div class="card">
            <div class="search">
                <h4>Search</h4>
                <input type="text" class="search-bar" v-model="input">
            </div>
            <div class="search-items">
                <div class="block" v-for="item in filteredList()" :key="item">
                    <div style="color: black;" draggable @dragstart="onDrag($event, item)">
                        <img :src="item.url" alt="" style="width: 100%; height: 100%;">
                    </div>
                </div>
                <div v-if="input&&!filteredList().length">
                    <p>No results found!</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useItemStore } from "../stores/item.store";

const itemStore = useItemStore()
const input = ref("");
const { fetchItems } = useItemStore()
fetchItems()

const { uniqueItems } = storeToRefs(useItemStore())

function filteredList() {
    return uniqueItems.value.filter((item) => {
        if(typeof(item) == 'object'){
            for(const value of Object.values(item)) {
                if (value.toString().toLowerCase().includes(input.value.toLowerCase())) {
                    return item;
                }
            }
        }
    })
}

async function onDrag(evt, item) {
    itemStore.item_drag_source = item;
    useItemStore.currentItem = item;
    evt.dataTransfer.dropEffect = 'copy';
    evt.dataTransfer.effectAllowed = 'copy';
    evt.dataTransfer.setData('itemID', item._id);
}

</script>
<style scoped>

    h4 {
        text-align: center;
    }

    .card {
        background-color: rgb(63, 63, 63);
        border-radius: 5px;
        margin: 5px;
        padding: 5px;
        overflow: auto;
        /* height: 100%; */
        max-height: 80vh;
    }

    .search {
        padding: 1.5em;
    }

    .search-bar {
        width: 100%;
        padding: 5px;
    }

    .search-items {
        display: grid;
        grid-template-columns: repeat(5, auto);
    }

    .block {
        min-width: 30px;
        min-height: 30px;
        aspect-ratio: 1;
        border-radius: 3px;
        /* padding: .25em; */
        /* margin: .25em; */
        padding: 2px;
        margin: 2px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* justify-content: stretch; */
        /* align-content: center; */
        color: #FFF;
        /* background-color: rgb(255, 255, 255); */
        background-color: #333;
        font-size: 8pt;
        max-width: 100%;
        max-height: 100%;
    }

    .block:hover {
        cursor: pointer;
    }

    .block img {
        /* max-width: 100%; */
        max-height: 100%;
        aspect-ratio: 1;
    }
</style>