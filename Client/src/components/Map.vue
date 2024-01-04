<template>
        <div>
            <h2 class="map-name">{{ props.map.title }}</h2>
            <!-- <h3>{{ props.map._id }}</h3> -->
            <div class="map-container">
                <div class="map-view" @mousemove="getLiveMousePos($event)" @dblclick.prevent="() => TogglePopup('buttonTrigger')"> <!--@dblclick.prevent="addAPoint($event, props.map._id)"-->
                    <span class="coord-tooltip" :style="[{'left':`${tooltipX}px`},{'top':`${tooltipY}px`}]">{{ currentMouseX }},{{ currentMouseY }}</span>
                    <span class="crosshair-x" :style="[{'top':`${crosshairY}px`}]">{{ currentMouseX }}</span>
                    <span class="crosshair-y" :style="[{'left':`${crosshairX}px`}]">{{ currentMouseY }}</span>            

                    <span v-for="point in props.map.points" :key="point._id">
                        <span @click="selectPoint(point)" class="point" :style="[{background : `${point.color}`},{top : `${point.y - 5}px`}, {left : `${point.x - 5}px`}]"></span>
                    </span>
                </div>

                <Popup v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')" class="point-popup">
                    <h2 style="color: black;">Add a New Point</h2>
                    <input type="text" v-model="newPoint.title" placeholder="Point Title">
                    <!-- <input type="color" v-model="newPoint.color"> -->

                    <div class="color-picker-container">
                        <span class="color-picker-color" :style="{background: `${selectedColor}`}"></span>
                        <div id="color-picker">
                            <div class="wrapper-dropdown">
                                <span @click="toggleDropdown()" v-html="selector"></span>
                                <ul class="dropdown" v-show="active">
                                    <li v-for="color in colors" :key="color._id" @click="setColor(color.hex, color.name)"><span :style="{background: color.hex}"></span> {{color.name}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="coord-input-boxes">
                        <input type="number" class="coord-input" placeholder="X" v-model="crosshairX">
                        <input type="number" class="coord-input" placeholder="Y" v-model="crosshairY">
                        <input type="hidden" class="coord-input" placeholder="X" v-model="tooltipX">
                        <input type="hidden" class="coord-input" placeholder="Y" v-model="tooltipY">
                    </div>
                    <select v-model="newPoint.category">
                        <option value="Enemy">Enemy Tribe</option>
                        <option value="Ally">Ally Tribe</option>
                        <option value="Resource">Rare Resource</option>
                        <option value="Obelisk">Obelisk</option>
                    </select>
                    <textarea name="" id="" cols="30" rows="10" placeholder="Use this area to describe the point..." v-model="newPoint.description"></textarea>
                    <button @click.prevent="addAPoint($event, props.map._id)">Add Point</button>
                </Popup>
                
                <!-- <button @click="() => TogglePopup('buttonTrigger')">Open Popup</button> -->

                <div class="map-sidebar-container">
                    MapID: {{  props.map._id }}

                    <br>

                    selectedPoint: {{ selectedPointTitle }}
                    <br/>
                    [ {{ selectedPointX }} , {{ selectedPointY }} ]

                    <br>

                    This is the sidebar
                    <div class="map-sidebar">
                        <input type="number" class="coord-input" v-model="crosshairY">
                        <input type="number" class="coord-input" v-model="crosshairX">
                        <button @click.prevent="addPoint">Add</button>

                    </div>

                    <pre style="font-size: 12px;">{{ props.map.points }}</pre>

                    <span v-for="point in props.map.points" :key="point._id">
                        {{ point._id.slice(-3) }} {{ point.x}}, {{  point.y }} <button @click="deleteAPoint(point._id)">Delete</button>
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

    const colors = [
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
    const active = ref(false)
    const selectedColor = ref('')
    const selectedColorName = ref('')

    const selector = computed(() => {
        if(!selectedColor.value) {
            return 'Point Type'
        } else {
            return '<span style="background: ' + selectedColor.value + '"></span> ' + selectedColorName.value
        }
    })

    const setColor = (color, colorName) => {
        selectedColor.value = color
        selectedColorName.value = colorName
        active.value = false
    }

    const toggleDropdown = () => {
        active.value = !active.value
    }

    // import { usePointStore } from '../stores/point.store'
    import { useMapStore } from '../stores/map.store'
    // const { addPoint } = usePointStore()
    // const { deletePoint } = usePointStore()
    const { deleteMap, deletePointFromMap, addPoint, deletePoint } = useMapStore()

    async function addAPoint(e, id) {
        console.log("the selected color is: ", selectedColor.value)
        const point = {
            color: selectedColor.value,
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
            newPoint.value.category = ''
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

    const selectedPointTitle = ref()
    const selectedPointX = ref(0)
    const selectedPointY = ref(0)

    const selectedPointMapX = ref(0)
    const selectedPointMapY = ref(0)

    async function selectPoint(point) {
        selectedPointTitle.value = point._id
        selectedPointX.value = point.x
        selectedPointY.value = point.y

        selectedPointMapX.value = point.mapX
        selectedPointMapY.value = point.mapY
    }

    </script>
    <style scoped>

    .point {
        position: absolute;
        width: 10px;
        height: 10px;
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

    .wrapper-dropdown {
    position: relative;
    width: 200px;
    background: #FFF;
    color: #2e2e2e;
    outline: none;
    cursor: pointer;
}
.wrapper-dropdown > span {
	width: 100%;
	display: block;
	border: 1px solid #ababab;
	padding: 5px;
}
.wrapper-dropdown > span > span {
  padding: 0 12px;
  margin-right: 5px;
}
.wrapper-dropdown > span:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    right: 16px;
    top: calc(50% + 4px);
    margin-top: -6px;
	  border-width: 6px 6px 0 6px;
    border-style: solid;
	  border-color: #2e2e2e transparent;
}

.wrapper-dropdown .dropdown {
    position: absolute;
	  z-index: 10;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    font-weight: normal;
	  list-style-type: none;
	  padding-left: 0;
	  margin: 0;
	  border: 1px solid #ababab;
	  border-top: 0;
}

.wrapper-dropdown .dropdown li {
    display: block;
    text-decoration: none;
    color: #2e2e2e;
	  padding: 5px;
	  cursor: pointer;
}

.wrapper-dropdown .dropdown li > span {
  padding: 0 12px;
  margin-right: 5px;
}

.wrapper-dropdown .dropdown li:hover {
    background: #eee;
	  cursor: pointer;
}

    </style>
    