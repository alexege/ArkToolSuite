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
import { useLayoutStore } from '../stores/layout';
import AddEditLayout from '../components/AddEditLayout.vue'

const { allLayouts } = storeToRefs(useLayoutStore())
const { fetchLayouts, addLayout } = useLayoutStore()
const activeLayoutId = ref(null)

async function activateLayout(id) {
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
<!-- <script>
import AddEditLayout from '../components/AddEditLayout.vue'

export default {
    components: { AddEditLayout },
    data() {
        return {
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            item: {
                title: null,
                description: 'Default description'
            },
            layouts: [1, 2, 3, 4, 5, 6]
        }
    },
    methods: {
        addLayout() {
            console.log("this is a method firing");
        }
    }
}
</script> -->
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