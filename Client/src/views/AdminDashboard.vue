<template>
    <div class="dashboard">
        <h2>Admin Dashboard</h2>

        <AddItem class="add-item"/>

        <div class="item-grid">
            <div v-for="(item, idx) in items" :key="item.id" class="cell">
            <div class="item">
                <span>{{ idx + 1 }}</span>
                <EditItem :item="item"/>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AddItem from '../components/AddItem.vue';
import EditItem from '../components/EditItem.vue';
import { storeToRefs } from 'pinia';
import { useItemStore } from '../stores/item'

const { items } = storeToRefs(useItemStore())
const { fetchItems } = useItemStore()

fetchItems()

</script>
<style scoped>
.dashboard {
    text-align: center;
}

.add-item {
    padding: 2em;
}

.item-grid {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(8, minmax(0, 1fr));
}

.item {
  display: flex;
  flex-direction: column;
  outline: 2px solid #45906C;
  border-radius: 3px;
  color: #FFF;
  background-color: rgb(63, 63, 63);
  font-size: 8pt;
}

/* .cell {
    border: 2px solid black;
    padding: 10px;
    margin: 10px;
} */
</style>