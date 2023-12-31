<template>
    <div>
        <div class="items" v-if="activeLayout && activeLayout.items">
            <div v-for="item in activeLayout.items" :key="item._id">
                <div class="block-cell" @drop="onDrop($event, item)" @dragover.prevent @dragenter.prevent @contextmenu="rightClickClear($event, item)">
                    <div class="block" draggable @dragstart="onDrag($event, item)">
                        <!-- <img :src="item.url ? item.url : 'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png'" :alt="item.title"> -->
                        {{ item.title }}
                        <img :src="item.url" :alt="item.title">
                    </div>
                </div>
            </div>
        </div>
        <div v-else style="text-align: center;">
            <p>Add a new Layout in the side panel to get started!</p>
            <h2>-></h2>
        </div>
    </div>
</template>
<script setup>

import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "../stores/auth.store.js";
import { useItemStore } from "../stores/item.store.js";
import { useLayoutStore } from "../stores/layout.store.js";

const itemStore = useItemStore()
// const { activeUser } = storeToRefs(useAuthStore())
const { activeLayout } = storeToRefs(useLayoutStore())
const { fetchItems, updateItem } = useItemStore()
const { selectLayout } = useLayoutStore()

const drag_source = ref(null)
const drag_target = ref(null)
const drag_target_holder = ref(null);

fetchItems()

async function onDrag(evt, item) {
    drag_source.value = item;
    evt.dataTransfer.dropEffect = 'move';
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('itemID', item._id);
}

async function onDrop(evt, item) {
    drag_target.value = item;
    drag_target_holder.value = this.drag_target;

    if(evt.dataTransfer.effectAllowed == 'move'){

        let data_target = {
            _id: this.drag_target._id,
            title: this.drag_source.title,
            url: this.drag_source.url,
            gridPosition: this.drag_source.gridPosition
        }
        
        let data_source = {
            _id: this.drag_source._id,
            title: this.drag_source.title,
            url: this.drag_target_holder.url,
            gridPosition: this.drag_target_holder.gridPosition
        }

        try {
            await updateItem(data_target)
            await updateItem(data_source)
        } catch (error) {
            console.log("error:", error)
        }
    } else if(evt.dataTransfer.effectAllowed == 'copy') {

        let data_source = null;

        if (this.drag_target) {
            data_source = {
                _id: this.drag_target._id,
                url: itemStore.item_drag_source.url
            }
        } else {
            data_source = {
                _id: itemStore.item_drag_source._id,
                url: itemStore.item_drag_source.url
            }
        }

        try {
            await updateItem(data_source)
        } catch(error) {
            console.log("error:", error)
        }
    }

    //This doesn't feel like the best way of doing things, but it seems to force the items to refresh upon changes.
    selectLayout(useLayoutStore().layout._id)
}

async function rightClickClear(evt, item) {
    evt.preventDefault();
    let clear_item = {
        _id: item._id,
        url: null,
        title: null,
        description: null,
    };
    await updateItem(clear_item);
    selectLayout(useLayoutStore().layout._id)
}

</script>
<style scoped>

.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}

.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  overflow: auto;
  max-height: 80vh;
  justify-content: space-between;
}

.block {
  min-width: 50px;
  min-height: 50px;
  aspect-ratio: 1;
  border-radius: 3px;
  padding: .5em;
  margin: .5em;
  text-align: center;
  display: flex;
  flex-direction: column;
  /* justify-content: stretch; */
  justify-content: center;
  /* align-items: center; */
  /* align-content: center; */
  color: #FFF;
  background-color: rgb(63, 63, 63);
  font-size: 8pt;
}

.block-cell {
  min-width: 50px;
  min-height: 50px;
  /* aspect-ratio: 1; */
  border-radius: 3px;
  /* padding: .5em;
  margin: .5em; */
  /* text-align: center; */
  /* display: flex; */
  flex-direction: column;
  justify-content: stretch;
  align-content: center;
  color: #FFF;
  /* background-color: rgb(63, 63, 63); */
  /* outline: 1px solid white; */
  font-size: 8pt;
  display: flex;
  /* margin: 2px */
}

.block:hover {
    background-color: rgb(102, 102, 102);
    /* transform: rotate(10deg);
    animation: 2s; */
    transition-property: transform;
    transition-duration: .25s;
    transform: scale(105%);
    box-shadow: 1px 1px 20px 5px rgba(255, 255, 255, 0.205);
    /* border-top: 1px solid white;
    border-left: 1px solid white; */
    cursor: pointer;
}

.block img {
    /* aspect-ratio: 1; */
    max-height: 100%;
    max-width: 100%;
}
</style>