<template>
    <div class="scout-map-container">
        <h2>Scout Map</h2>
        <div>
            <pre v-for="map in maps" :key="map._id">
                {{ map.title }}
                <img :src="map.url" alt="" width="200" height="200">
            </pre>
        </div>
        <div class="map-selection">
            <div class="map" v-for="map in allMaps" :key="map._id">
                {{ map.title }}
                <button @click="deleteAMap(map._id)">X</button>
            </div>
        </div>
        <div class="map-display">
            <Map v-for="map in allMaps" :key="map.name" :map="map" class="map-wrapper"/>
        </div>

        <Popup v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')">
            <Label>Map Name:</Label>
            <input type="text" placeholder="Name" v-model="newMap.mapName">
            <br>
            <Label>Map Url:</Label>
            <input type="text" placeholder="Url" v-model="newMap.mapUrl">
            <br>
            <Label>Map BG-Url:</Label>
            <input type="text" placeholder="bgUrl" v-model="newMap.mapBgUrl">
            <br>
            <button @click="addAMap()">Add Map</button>
        </Popup>

        <button @click="addANewMap" class="add-map-button">Add Map</button>

    </div>
</template>
<script setup>
import Map from '../components/Map.vue'
import { ref, onMounted, computed } from 'vue'

import Popup from '../components/Popup.vue';

const TogglePopup = (trigger) => {
    popupTriggers.value[trigger] = !popupTriggers.value[trigger]
}

const popupTriggers = ref({
    buttonTrigger: false,
    // timedTrigger: false //This is not used as we don't need a timed-popup
    // Check out tutorial for how to implement this: https://www.youtube.com/watch?v=HorXomQrOi8
})

const addANewMap = () => {
    newMap.value.mapName = ''
    newMap.value.mapUrl = ''
    newMap.value.mapBgUrl = ''
    TogglePopup('buttonTrigger')
}

// const allMaps = ref(['Island', 'Scorched Earth', 'Aberration', 'Ragnarok', 'Valguero', 'Crystal Isles', 'Extinction', 'Lost Island', 'Genesis I', 'Genesis II', 'The Center', 'Fjordur'])


import { useMapStore } from '../stores/map.store'
// import { usePointStore } from '../stores/point.store'

const mapStore = useMapStore()
// const pointStore = usePointStore()

const newMap = ref({
    mapName: '',
    mapUrl: '',
    mapBgUrl: '',
    points: []
})

function addAMap() {
    TogglePopup('buttonTrigger')
    mapStore.addMap(newMap.value)
}

// const newPoint = ref({
//     coordX: 100,
//     coordY: 100
// })

// function addAPoint(mapId) {
//     pointStore.addPoint(mapId, newPoint.value)
// }

function deleteAMap(id) {
    mapStore.deleteMap(id)
}

const allMaps = computed(() => {
    return mapStore.allMaps;
})

onMounted(() => {
    mapStore.fetchMaps()
})

</script>
<style scoped>
h2 {
    text-align: center;
}

.scout-map-container {
    display: flex;
    flex-direction: column;
}

.add-map-button {
    text-align: center;
    margin: 0 auto;
    padding: 1em;
    background-color: black;
    color: white;
    border: 2px solid white;
    border-radius: 5px;
    cursor: pointer;
}

.map-wrapper {
    padding: 1em;
}

.map-selection {
    display: flex;
    overflow: auto;
    justify-content: center;
}

.map {
    outline: 2px solid white;
    border-radius: 5px;
    padding: 20px;
    margin: 20px;
}

.map-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    /*height: 100%;*/
    /* background-color: rgb(61, 56, 56); */
}
</style>