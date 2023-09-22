<template>
    <div>
        <div>
            <div class="card">
                <p class="card-title">SidePanel</p>
                <button class="save-button">
                    Save
                </button>
                <button class="add-button" @click="add">
                    +
                </button>
            </div>
            <AddEditLayout v-for="layout in allLayouts" :key="layout._id" v-bind:layout="layout" @click="activateLayout(layout._id)" :class="activeLayoutId === layout._id ? 'active' : ''"/>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue"
import { storeToRefs } from 'pinia';
import { useLayoutStore } from '../stores/layout.store.js';
import AddEditLayout from '../components/AddEditLayout.vue'

const { allLayouts } = storeToRefs(useLayoutStore())
const { fetchLayouts, addLayout, selectLayout } = useLayoutStore()
const activeLayoutId = ref(null)

async function activateLayout(id) {
    await selectLayout(id);
    activeLayoutId.value = id;
}

async function add() {
    await addLayout()
    .then(() => {
        console.log("Added a new layout");
    })
}

fetchLayouts()

</script>
<style scoped>
    h2 {
        text-align: center;
    }

    .card {
        background-color: rgb(63, 63, 63);
        border-radius: 5px;
        padding: 5px;
        margin: 5px;
        width: 100%;
        flex-basis: 100%;
        display: flex;
        align-items: center;
        text-align: left;
    }

    .card-title {
        font-size: 1.5em;
        color: white;
        width: 50%;
        margin: 0.25em;
    }

    .save-button {
        width: 25%;
        padding: 1em;
        margin: 0.25em;
    }

    .add-button {
        width: 25%;
        padding: 1em;
        margin: 0.25em;
    }

    .active {
        outline: 2px solid yellow;
    }
</style>