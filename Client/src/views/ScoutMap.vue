<template>
    <div>
        <h2>Scout Map</h2>
        <div>
            <pre v-for="map in maps" :key="map._id">
                {{ map.title }}
                <img :src="map.url" alt="" width="200" height="200">
            </pre>
        </div>
        <div class="add-map">
            <input type="text" placeholder="Name" v-model="newMap.mapName">
            <input type="text" placeholder="Url" v-model="newMap.mapUrl">
            <input type="text" placeholder="bgUrl" v-model="newMap.mapBgUrl">
            <button @click="addAMap()">Add Map</button>
        </div>
        <div class="map-selection">
            <div class="map" v-for="map in allMaps" :key="map._id">
                {{ map.title }}
                <button @click="deleteAMap(map._id)">X</button>
            </div>
        </div>
        <div class="map-display">
            <Map v-for="map in allMaps" :key="map.name" :map="map" />
        </div>
    </div>
</template>
<script setup>
import Map from '../components/Map.vue'
import { ref, onMounted, computed } from 'vue'

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
    height: 100%;
    background-color: rgb(61, 56, 56);
}
</style>