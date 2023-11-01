<template>
    <div>
        <h2>Scout Map</h2>
        <div class="map-selection">
            <div class="map">Island</div>
            <div class="map">Scortched Earth</div>
            <div class="map">Aberration</div>
            <div class="map">Extinction</div>
            <div class="map">Crystal Isles</div>
            <div class="map">Valguero</div>
            <div class="map">Ragnarok</div>
            <div class="map">Lost Island</div>
            <div class="map">The Center</div>
            <div class="map">Fjordur</div>
            <div class="map">Genesis I</div>
            <div class="map">Genesis II</div>
        </div>
        <div class="map-display">
            <Map v-for="map in allMaps" :key="map.name" :name="map" />
        </div>
    </div>
</template>
<script setup>
import Map from '../components/Map.vue'
import { ref } from 'vue'

const allMaps = ref(['Island', 'Scorched Earth', 'Aberration', 'Ragnarok', 'Valguero', 'Crystal Isles', 'Extinction', 'Lost Island', 'Genesis I', 'Genesis II', 'The Center', 'Fjordur'])

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