<template>
        <div>
            <h2 class="map-name">{{ props.map.title }}</h2>
            <div class="map-container">
                <div class="map-view" @mousemove="getLiveMousePos($event)" @dblclick.prevent="() => TogglePopup('buttonTrigger')"> <!--@dblclick.prevent="addAPoint($event, props.map._id)"-->
                    <span class="coord-tooltip" :style="[{'left':`${tooltipX}px`},{'top':`${tooltipY}px`}]">{{ currentMouseX }},{{ currentMouseY }}</span>
                    <span class="crosshair-x" :style="[{'top':`${crosshairY}px`}]">{{ currentMouseX }}</span>
                    <span class="crosshair-y" :style="[{'left':`${crosshairX}px`}]">{{ currentMouseY }}</span>            

                    <span v-for="point in props.map.points" :key="point._id">
                        <span @click="selectPoint(point)" class="point" :style="[{background : `${point.color}`},{top : `${point.y - 5}px`}, {left : `${point.x - 5}px`}]"></span>
                        <span style="position:absolute" :style="[{top : `${point.y + 5}px`}, {left : `${point.x + 5}px`}]">
                                <span v-if="showCoords">({{ point.mapX }},{{ point.mapY }})</span><br />
                                <span v-if="showTitle">{{ point.title }}</span><br />
                                <span v-if="showId">{{ point._id }}</span><br />
                                <span v-if="showColor">{{ point.color }}</span><br />
                                <span v-if="showCategory">{{ point.category }}</span><br />
                                <span v-if="showDescription">{{ point.description }}</span><br />
                        </span>
                    </span>
                </div>

                <Popup v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')" class="point-popup">
                    <h2 style="color: black;">Add a New Point</h2>
                    <input type="text" v-model="newPoint.title" placeholder="Point Title">

                    <div class="coord-input-boxes">
                        <input type="number" class="coord-input" placeholder="X" v-model="crosshairX">
                        <input type="number" class="coord-input" placeholder="Y" v-model="crosshairY">
                        <input type="hidden" class="coord-input" placeholder="X" v-model="tooltipX">
                        <input type="hidden" class="coord-input" placeholder="Y" v-model="tooltipY">
                    </div>

                    <div class="category-container">
                        <span class="category-color" :style="{background:`${newPointColor}`}"></span>
                        <select v-model="newPoint.category">
                            <option v-for="option in pointTypes" :key="option" :value="option.name">{{ option.name }}</option>
                        </select>
                    </div>
                    <textarea name="" id="" cols="30" rows="10" placeholder="Use this area to describe the point..." v-model="newPoint.description"></textarea>
                    <button @click.prevent="addAPoint($event, props.map._id)">Add Point</button>
                </Popup>

                <div class="map-sidebar-container">

                    <div>
                        Controls
                        <br />
                        <label><input type="checkbox" v-model="showTitle">Show Title</label>
                        <br />
                        <label><input type="checkbox" v-model="showCoords">Show Coordinates</label>
                        <br />
                        <label><input type="checkbox" v-model="showId">showId</label>
                        <br />
                        <label><input type="checkbox" v-model="showColor">showColor</label>
                        <br />
                        <label><input type="checkbox" v-model="showCategory">showCategory</label>
                        <br />
                        <label><input type="checkbox" v-model="showDescription">showDescription</label>
                        <br />
                    </div>

                    Point: {{ selectedPointTitle }}
                    Coords: [{{ selectedPointX }},{{ selectedPointY }}]
                    Category: {{ selectedPointCategory }}
                    Description: {{ selectedPointDescription }}

                    <!-- This is the sidebar
                    <div class="map-sidebar">
                        <input type="number" class="coord-input" v-model="crosshairY">
                        <input type="number" class="coord-input" v-model="crosshairX">
                        <button @click.prevent="addPoint">Add</button>

                    </div> -->

                    <span v-for="point in props.map.points" :key="point._id" class="point-overview">
                        <div :style="{ background: `${point.color}`}" style="width:15px;height:15px; border-radius:50%;"></div>
                        {{  point.title }} [{{ point.mapX}},{{  point.mapY }}]
                        
                        <button @click="editAPoint(point._id)">Edit</button>
                        <button @click="deleteAPoint(point._id)">Delete</button>
                    </span>

                    <div style="position: absolute;" :style="[{'left':`${selectedPointMapX}px`},{'top':`${selectedPointMapY}px`}]">
                        {{ selectedPointMapX }}, {{ selectedPointMapY}}
                    </div>
                    
                </div>
                
                <button @click="deleteMap(props.map._id)" class="delete-button">x</button>
            </div>

        </div>
    </template>
    <script setup>
    import Popup from '../components/Popup.vue'

    const TogglePopup = (trigger) => {
        popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }

    const popupTriggers = ref({
        buttonTrigger: false,
        timedTrigger: false
    })

    import { ref, computed } from 'vue'

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
        crosshairX.value = e.pageX - e.currentTarget.offsetLeft;
        crosshairY.value = e.pageY - e.currentTarget.offsetTop;
    }
    // const setPoint = (e, id) => {
    //     console.log(`clientX:${e.clientX}, clientY: ${e.clientY}`)
    //     console.log("event:", e);
    //     console.log("mapID:", id);
    // }

    const pointTypes = [
        {
            name: 'Enemy',
            hex: '#FF0000'
        },
        {
            name: 'Ally',
            hex: '#00FFFF'
        },
        {
            name: 'POI',
            hex: '#FFFF00'
        },
        {
            name: 'Tames',
            hex: '#00FF00'
        },
        {
            name: 'Caves',
            hex: '#0000FF'
        }
    ]

    const newPointColor = computed(() => {
        if (newPoint.value && newPoint.value.category) {
            console.log("category:", newPoint.value.category)
            let indexOfColor = pointTypes.findIndex(point => point.name === newPoint.value.category)
            console.log("index of newPointColor:", indexOfColor)
            return pointTypes[indexOfColor].hex
        }
    })

    const newPoint = ref({
        color: '#FFFFFF',
        title: '',
        category: 'Enemy',
        description: null,
        x: crosshairX,
        y: crosshairY,
        mapX: currentMouseX,
        mapY: currentMouseY,
    })

    import { useMapStore } from '../stores/map.store'
    const { deleteMap, deletePointFromMap, addPoint, deletePoint } = useMapStore()

    async function addAPoint(e, id) {
        // console.log("the selected color is: ", pointTypes[newPoint.value.category].hex)

        let pointColorIndex = pointTypes.findIndex(point => point.name === newPoint.value.category)
        let pointColor = pointTypes[pointColorIndex].hex
        console.log("Point color is: ", pointColor)

        const point = {
            color: pointColor,
            title: newPoint.value.title,
            category: newPoint.value.category,
            description: newPoint.value.description,
            x: newPoint.value.x, //Why are these reversed?
            y: newPoint.value.y,
            mapX: newPoint.value.mapX,
            mapY: newPoint.value.mapY,
        }

        const data = {
            mapId: id,
            point: point
        }

        // await addPoint(point, id)
        await addPoint(data)
        .then((res) => {
            TogglePopup('buttonTrigger')
            newPoint.value.color = ''
            newPoint.value.title = ''
            newPoint.value.category = 'Enemy'
            newPoint.value.description = ''
            newPoint.value.x = 0
            newPoint.value.y = 0
            newPoint.value.mapX = 0
            newPoint.value.mapY = 0
            console.log("Adding point: ", res)
        })
        .catch((err) => {
            console.log("error:", err)
        })
    }

    async function deleteAPoint(pointId) {
        console.log(`Deleting point: ${pointId}`)
        await deletePoint(pointId)
        .then(() => {
            deletePointFromMap(props.map._id, pointId)
        })
    }

    const selectedPointId = ref()
    const selectedPointTitle = ref()
    const selectedPointX = ref(0)
    const selectedPointY = ref(0)

    const selectedPointMapX = ref(0)
    const selectedPointMapY = ref(0)

    const selectedPointColor = ref('')
    const selectedPointCategory = ref('')
    const selectedPointDescription = ref('')

    async function selectPoint(point) {
        selectedPointId.value = point._id
        selectedPointTitle.value = point.title
        selectedPointX.value = point.x
        selectedPointY.value = point.y

        selectedPointMapX.value = point.mapX
        selectedPointMapY.value = point.mapY

        selectedPointColor.value = point.color
        selectedPointCategory.value = point.category
        selectedPointDescription.value = point.description
    }

    // Custom View

    const showId = ref(false)
    const showCoords = ref(false)
    const showTitle = ref(false)
    const showColor = ref(false)
    const showCategory = ref(false)
    const showDescription = ref(false)

    </script>
    <style scoped>

    .category-container {
        display: flex;
    }

    .category-color {
        width: 2em;
        height: 2em;
        background: red;
    }

    .point {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .point-overview {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
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

    .coord-input-boxes {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .coord-input {
        width: 25%;
    }

    .delete-button {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
    }

    .point-popup {
        color: black;
        /* display: flex;
        flex-direction: column; */
    }

    /* Color Picker */

    .color-picker-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .color-picker-color {
        width: 24px;
        height: 24px;
        margin: .25em;
    }
    </style>
    