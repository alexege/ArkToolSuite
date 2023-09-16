<template>
    <div>
        <div class="card">
            <div class="profile">
                <img src="data:image/png;base64,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" alt="" class="profile-icon">
                <p>User Name</p>
            </div>
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
import { useItemStore } from "../stores/item";
const input = ref("");
const { fetchItems } = useItemStore()
fetchItems()

const { allItems } = storeToRefs(useItemStore())

function filteredList() {
    return allItems.value.filter((item) => {
        if(typeof(item) == 'object'){
            for(const [key, value] of Object.entries(item)) {
                if (value.toString().toLowerCase().includes(input.value.toLowerCase())) {
                    return item;
                }
            }
        }
    })
}

async function onDrag(evt, item) {
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
    }

    .profile {
        display: flex;
        align-items: center;
    }

    .profile-icon {
        width: 100px;
        height: 100px;
        border-radius: 20px;
        padding: .5em;
        margin: .5em;
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
        justify-content: stretch;
        align-content: center;
        color: #FFF;
        background-color: rgb(255, 255, 255);
        font-size: 8pt;
    }
</style>