<template>
    <div>
        <div class="edit-container">

            <!-- Edit Mode Active -->
            <template v-if="editing">
                <input type="text" v-model="updatedItem.title">
                <img :src="updatedItem.url" alt="" class="block-image">
                <input type="text" v-model="updatedItem.url">
                <textarea v-model="updatedItem.description"></textarea>
            </template>

            <!-- Default View -->
            <template v-else>
                <h2>{{ updatedItem.title }}</h2>
                <img :src="updatedItem.url" alt="" class="block-image">
                <!-- <span class="url">{{ updatedItem.url }}</span> -->
                <p>{{ updatedItem.description }}</p>
                <p>{{ updatedItem.gridPosition }}</p>
            </template>

            <div class="action-buttons">
                <button @click="toggleEdit" v-if="!editing">Edit</button>
                <button @click="updateItem(updatedItem)" v-else>Update</button>

                <button v-if="editing" @click="toggleEdit">Cancel</button>
                <button v-else @click="deleteItem(updatedItem._id)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import ItemService from '../services/item.service';
import { ref } from "vue";
import { useItemStore } from '../stores/item';

const { fetchItems } = useItemStore()
const editing = ref(false);
const props = defineProps(["item"]);

const updatedItem = ref({
    _id: props.item._id,
    title: props.item.title,
    url: props.item.url,
    description: props.item.description,
    gridPosition: props.item.gridPosition
})

function toggleEdit() {
    editing.value = !editing.value;
}

function updateItem(item) {
    let data = {
        _id: item._id,
        title: updatedItem.value.title,
        url: updatedItem.value.url,
        description: updatedItem.value.description,
        gridPosition: updatedItem.value.gridPosition
    }
    ItemService.update(data)
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        editing.value = false;
    })
}

function deleteItem(id) {
    ItemService.delete(id)
    .then(() => {
        fetchItems()
    })
    .catch(error => {
        console.log(error);
    })
}

</script>
<style scoped>
    .edit-container {
        display: flex;
        flex-direction: column;
    }

    .block-image {
        aspect-ratio: 1;
        margin: 0 auto;
        max-width: 100px;
        max-height: 100px;
    }

    .action-buttons {
        padding: 10px;
    }

    .action-buttons button {
        width: 50%;
    }

    .action-buttons button:hover {
        background-color: #45906C;
        color: white;
    }
    
    .url {
        overflow: hidden;
    }
</style>