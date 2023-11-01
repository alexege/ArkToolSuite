<template>
        <div>
            <h2 class="map-name">{{ props.name }}</h2>
            <div class="map-container">
                <div class="map-view" @mousemove="getLiveMousePos($event)" @dblclick.prevent="setPoint($event, props.id)">
                    <span class="coord-tooltip" :style="[{'left':`${tooltipX}px`},{'top':`${tooltipY}px`}]">{{ currentMouseY }},{{ currentMouseX }}</span>
                    <span class="crosshair-x" :style="[{'top':`${topv}px`}]">{{ currentMouseX }}</span>
                    <span class="crosshair-y" :style="[{'left':`${leftv}px`}]">{{ currentMouseY }}</span>            
                </div>
                <div class="map-sidebar">
                    This is the sidebar
                    <div>
                        <input type="text" v-model="leftv">
                        <input type="text" v-model="topv">
                    </div>
                </div>
            </div>
        </div>
    </template>
    <script setup>
    import { ref } from 'vue'

    // Sidebar Content

    // Map Content
    const topv = ref(0);
    const leftv = ref(0);
    const currentMouseX = ref(0);
    const currentMouseY = ref(0);
    const tooltipX = ref(0);
    const tooltipY = ref(0);
    const props = defineProps(['name', 'id'])
    const getLiveMousePos = (e) =>{
        var x = e.pageX - e.currentTarget.offsetLeft;
        var y = e.pageY - e.currentTarget.offsetTop;
        var width = e.currentTarget.offsetWidth;
        var height = e.currentTarget.offsetHeight;
        currentMouseX.value = Math.floor(x / width * 100);
        currentMouseY.value =  Math.floor(y / height * 100);
        
        tooltipX.value = e.pageX - e.currentTarget.offsetLeft + 20;
        tooltipY.value = e.pageY - e.currentTarget.offsetTop;
        topv.value = e.pageY - e.currentTarget.offsetTop;
        leftv.value = e.pageX - e.currentTarget.offsetLeft;
    }
    const setPoint = (e, id) => {
        console.log("event:", e);
        console.log("mapID:", id);
    }
    </script>
    <style scoped>
    .map-container {
        display: flex;
        flex-direction: row;
    }
    .map-name {
        text-align: center;
        color: white;
        font-size: 2em;
    }
    .coord-tooltip {
        position: absolute;
    }
    .map-view {
        color: white;
        width: 50vw;
        height: 50vw;
        outline: 1px dashed black;
        cursor: pointer;
        overflow: hidden;
        position: relative;

        background: url('../src/assets/TheIsland.png');
        background-repeat: no-repeat;
        background-size: cover;
    }
    .crosshair-x {
        background-color: black;
        width: 100%;
        height: 1px;
        margin-top: 0;
        position: absolute;
    }
    .crosshair-y {
        background-color: black;
        height: 100vh;
        width: 1px;
        margin-left: 0;
        top: 0;
        position: absolute;
    }

    .map-sidebar {
        background-color: rgba(11, 155, 212, 0.458);
        color: white;
        padding: 1em;
    }
    </style>
    