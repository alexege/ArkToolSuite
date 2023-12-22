<template>
        <div>
            <h2 class="map-name">{{ props.map.title }}</h2>
            <h3>{{ props.map._id }}</h3>
            <div class="map-container">
                <div class="map-view" @mousemove="getLiveMousePos($event)" @dblclick.prevent="addAPoint($event, props.map._id)">
                    <span class="coord-tooltip" :style="[{'left':`${tooltipX}px`},{'top':`${tooltipY}px`}]">{{ currentMouseY }},{{ currentMouseX }}</span>
                    <span class="crosshair-x" :style="[{'top':`${crosshairX}px`}]">{{ currentMouseX }}</span>
                    <span class="crosshair-y" :style="[{'left':`${crosshairY}px`}]">{{ currentMouseY }}</span>            

                    <span v-for="point in props.map.points" :key="point._id">
                        <span @click="selectPoint(point)" class="point" :style="[{top : `${point.y - 5}px`}, {left : `${point.x - 5}px`}]"></span>
                    </span>
                </div>
                <div class="map-sidebar-container">
                    MapID: {{  props.map._id }}

                    <br>

                    selectedPoint: [ {{ selectedPointX }} , {{ selectedPointY }} ]

                    <br>

                    This is the sidebar
                    <div class="map-sidebar">
                        <input type="number" class="coord-input" v-model="crosshairY">
                        <input type="number" class="coord-input" v-model="crosshairX">
                        <button @click.prevent="addPoint">Add</button>

                    </div>

                    <span v-for="point in props.map.points" :key="point._id">
                        {{ point.x}}, {{  point.y }} <button @click="deleteAPoint(point._id)">Delete</button>
                    </span>
                    
                </div>

                <button @click="deleteMap(props.map._id)">Delete</button>
            </div>

        </div>
    </template>
    <script setup>
    import { ref } from 'vue'

    // Sidebar Content
    // const w = Math.floor(e.pageX - e.currentTarget.offsetLeft / e.currentTarget.offsetWidth * 100);
    // const h = Math.floor(e.pageY - e.currentTarget.offsetTop / e.currentTarget.offsetHeight * 100);

    // Map Content
    const crosshairX = ref(0);
    const crosshairY = ref(0);
    const currentMouseX = ref(0);
    const currentMouseY = ref(0);
    const tooltipX = ref(0);
    const tooltipY = ref(0);
    const props = defineProps(['name', 'id', 'map'])
    const getLiveMousePos = (e) =>{
        var x = e.pageX - e.currentTarget.offsetLeft;
        var y = e.pageY - e.currentTarget.offsetTop;
        var width = e.currentTarget.offsetWidth;
        var height = e.currentTarget.offsetHeight;
        currentMouseX.value = Math.floor(x / width * 100);
        currentMouseY.value =  Math.floor(y / height * 100);
        
        tooltipX.value = e.pageX - e.currentTarget.offsetLeft + 20;
        tooltipY.value = e.pageY - e.currentTarget.offsetTop;
        crosshairX.value = e.pageY - e.currentTarget.offsetTop;
        crosshairY.value = e.pageX - e.currentTarget.offsetLeft;
    }
    // const setPoint = (e, id) => {
    //     console.log(`clientX:${e.clientX}, clientY: ${e.clientY}`)
    //     console.log("event:", e);
    //     console.log("mapID:", id);
    // }

    // import { usePointStore } from '../stores/point.store'
    import { useMapStore } from '../stores/map.store'
    // const { addPoint } = usePointStore()
    // const { deletePoint } = usePointStore()
    const { deleteMap, deletePointFromMap, addPoint, deletePoint } = useMapStore()

    async function addAPoint(e, id) {
        console.log("pageX", e.pageX)
        console.log("pageY", e.pageY)
        console.log("mapID: ", id)
        const point = {
            mapX: e.clientX,
            mapY: e.clientY,
            x: crosshairY.value, //Why are these reversed?
            y: crosshairX.value
        }

        console.log("--point--: ", point)

        await addPoint(point, id)
        .then((res) => {
            console.log("Adding point: ", res)
        })
        .catch((err) => {
            console.log("error:", err)
        })
    }

    async function deleteAPoint(pointId) {
        console.log(`pointId: ${pointId} \n mapId: ${props.map._id}`)
        await deletePoint(pointId)
        .then((res) => {
            deletePointFromMap(props.map._id, pointId)
        })
    }

    const selectedPointX = ref(0)
    const selectedPointY = ref(0)
    const selectedPointTitle = ref()

    async function selectPoint(point) {
        selectedPointTitle.value = point._id
        selectedPointX.value = point.x
        selectedPointY.value = point.y
    }

    </script>
    <style scoped>

    .point {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: red;
        border-radius: 50%;
    }

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

    .map-sidebar-container {
        background-color: rgba(11, 155, 212, 0.458);
        color: white;
        padding: 1em;
        display: flex;
        width: 20vw;
        flex-direction: column;
        align-items: center;
    }

    .map-sidebar {
        display: flex;
    }

    .coord-input {
        width: 50%;
    }
    </style>
    