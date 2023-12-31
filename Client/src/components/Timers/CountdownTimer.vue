<script setup>
import { storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useTimerStore } from '../../stores/timer.store';

const dinoLevel = ref(150);

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

const timeOut = ref(0);
const timeToZero = ref(0);
const startDuration = ref(0);

let percentLeft = ref(0);
const timesUp = ref(false);

const props = defineProps(['timer'])
const emit = defineEmits(['close'])

watch([days, hours, minutes, seconds], ([newDays, newHours, newMinutes, newSeconds], [oldDays, oldHours, oldMinutes, oldSeconds]) => {
    
    if(newHours == 24){
        hours.value = 0;
        days.value++;
    }
    if(newMinutes == 60){
        minutes.value = 0;
        hours.value++;
    }
    if(newSeconds == 60){
        seconds.value = 0;
        minutes.value++;
    }

    timeToZero.value = days.value * 86400000 + hours.value * 3600000 + minutes.value * 60000 + seconds.value * 1000;
    
    //Keep track of original start duration.
    startDuration.value = timeToZero.value;
    if(timeToZero.value > 0) percentLeft.value = 100;
    if(timeToZero.value == 0) percentLeft.value = 0;
    console.log(`${newDays}:${newHours}:${newMinutes}:${newSeconds}`)
})

function start() {
    isPaused.value = false
    isEditing.value = false

    var startTime = Date.now()
    var desiredDelay = 1000;
    var actualDelay = 1000;

    percentLeft.value = Math.floor(timeToZero.value / startDuration.value * 100);

    timeOut.value = setTimeout(() => {

        var actual = Date.now() - startTime;
        actualDelay = desiredDelay - (actual - desiredDelay);

        timeToZero.value -= 1000;

        if(timeToZero.value > 0) {
            start()
        } else {
            percentLeft.value = 0;
            alert(`${props.timer.name} timer is up!`);
            isPaused.value = true
        }
    }, actualDelay)
}

function updateStart() {
    startDuration.value = timeToZero.value
}

function stop() {
    isPaused.value = true
    clearTimeout(timeOut.value)
}

function reset() {
    isPaused.value = true
    clearTimeout(timeOut.value)
    timeToZero.value = inputStartTime.value
}

function clear() {
    isPaused.value = true
    clearTimeout(timeOut.value)
    days.value = 0;
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    timeToZero.value = 0;
}

function addTime(mins) {
    if(minutes.value >= 60){
        minutes.value = minutes.value - 60
        hours.value += 1;
    }
    // startDuration.value += mins * 60;
    
    minutes.value += mins;
}

function toggleSettings(timerId) {
    console.log("id:", timerId)
    this.isHovering = !this.isHovering;
}

function deleteTimer(timerId) {
    emit('close', timerId)
}


function msToTime(ms) {
    var seconds = Math.floor((ms / 1000) % 60);
    var minutes = Math.floor((ms / (1000 * 60)) % 60);
    var hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    var days = Math.floor((ms / (1000 * 60 * 60)) / 24);
    days = (days < 10) ? "0" + days : days;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return `${days}:${hours}:${minutes}:${seconds}`;
}

const inputStartTime = computed(() => {
    return days.value * 86400000 + hours.value * 3600000 + minutes.value * 60000 + seconds.value * 1000;
})


/////////////////////////////////////
//////////Customization//////////////
/////////////////////////////////////


// Update Timer Name
const { updateTimer } = useTimerStore()
const isEditingTimerName = ref(false);
const editTimer = {
    name: 'Timer Name'
}

function editName() {
    isEditingTimerName.value = true;
}

async function updateTimerName() {
    var data = {
        _id: props.timer._id,
        name: editTimer.name
    }
    await updateTimer(data)
    props.timer.name = data.name
    isEditingTimerName.value = false;
}

// Editing Timer Time
const isEditing = ref(false)
const isHovering = ref(false)
const isPaused = ref(true)



const timeIsEmpty = computed(() => {
    return timeToZero.value === 0;
})

const progressColor = computed(() => {
    if (percentLeft.value > 60){
        return 'green'
    } else if(percentLeft.value > 30){
        return 'yellow'
    } else {
        return 'red'
    }
})





// Modal Logic

const changeTimerIcon = () => {
    showModal.value = true
}

import Modal from "../../components/Modal.vue"
const showModal = ref(false)

const closeModal = () => {
  console.log("closing modal")
  showModal.value = false
}

const updateImage = async (name) => {
    showModal.value = false
    
    const urlString = `src/assets/dinos/${name}.png`

    //Logic to update timer with desired url
    const data = { 
        _id: props.timer._id,
        img: urlString 
    }

    //If timer name is default, set it to dino name
    if(props.timer.name == 'Timer Name'){
        console.log("Name was left default, setting it to dinosaur name.")
        data.name = name
    }

    await updateTimer(data)

}

const hide = ref(true)

function showSettingsCog() {
    hide.value = false;
}

function hideSettingsCog() {
    hide.value = true;
}

// Adding dinos to the Modal
import { useItemStore } from "../../stores/item.store"
const { fetchItems } = useItemStore()
const { uniqueItems } = storeToRefs(useItemStore())
fetchItems()

const dinoName = ref("");

function filteredList() {
    return uniqueItems.value.filter((item) => {
        if(typeof(item) == 'object'){
            for(const value of Object.values(item)) {
                if (value.toString().toLowerCase().includes(dinoName.value.toLowerCase())) {
                    return item;
                }
            }
        }
    })
}

</script>

<template>
    <div class="timer" :class="{ timerFinished: timesUp }">

    <!-- Modal -->
    <teleport to="#modals">
      <div class="modal-bg" v-if="showModal" @click.self="closeModal">
        <div class="modal">
          <!-- <Modal @close="closeModal" @selectedImage="updateImage" :items="uniqueItems"> -->
          <!-- <Modal @close="closeModal" @selectedImage="updateImage" :items="uniqueItems"> -->
          <Modal @close="closeModal" @selectedImage="updateImage" :items="filteredList()">
            <h2>Dino Search</h2>
            <input type="text" class="search-bar" v-model="dinoName">
          </Modal>
        </div>
      </div>
    </teleport>

    <div class="nav-timer">
         <div class="nav-img" @mouseenter="showSettingsCog" @mouseleave="hideSettingsCog">
            <span class="edit-nav-img" :class="{hide: hide}" @click="changeTimerIcon">Edit</span>
            <img :src="timer.img" alt="" v-if="timer.img">
            <img src="https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg" width="80px" alt="" v-else>
            <!-- <img :src='`${timer.img}` || "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg"' alt="Timer Image"> -->
         </div>
         
            <div class="nav-content">
                <div class="timer-title">
                    <template v-if="isEditingTimerName">
                        <input type="text" v-model="editTimer.name" @blur="updateTimerName" @keydown.enter="updateTimerName" class="timer-name-input">
                    </template>
                    <template v-else>
                        <h2 @dblclick="editName" class="timer-name">{{ timer.name }}</h2>
                    </template>
                </div>
                <div>
                    <input type="number" v-model="dinoLevel" @blur="updateDinoLevel" placeholder="150" step="5" min="5" max="500">
                </div>
                <div class="timer-value">
                    <div v-if="isHovering">

                        <h2 class="time-left">{{ msToTime(timeToZero) }}</h2>

                        <div class="time-left-controls">
                            <div class="input-control">
                                <label for="days">day</label>
                                <div class="input-control-value">
                                    <input type="number" min="0" max="100" v-model="days" placeholder="Days" @change="updateStart()">
                                    <span>:</span>
                                </div>
                            </div>
                            <div class="input-control">
                                <label for="hours">hrs</label>
                                <div class="input-control-value">
                                    <input type="number" min="0" max="24" v-model="hours" placeholder="Hours" @change="updateStart()">
                                    <span>:</span>
                                </div>
                            </div>
                            <div class="input-control">
                                <label for="minutes">min</label>
                                <div class="input-control-value">
                                    <input type="number" min="0" max="60" v-model="minutes" placeholder="Minutes" @change="updateStart()">
                                    <span>:</span>
                                </div>
                            </div>
                            <div class="input-control">
                                <label for="seconds">sec</label>
                                <input type="number" min="0" max="60" v-model="seconds" placeholder="Seconds" @change="updateStart()">
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h2 class="time-left">{{ msToTime(timeToZero) }}</h2>
                    </div>
                    <div v-if="isHovering" class="add-time">
                        <button @click="addTime(1)" class="add-time-button">+1</button>
                        <button @click="addTime(5)" class="add-time-button">+5</button>
                        <button @click="addTime(15)" class="add-time-button">+15</button>
                        <span>mins</span>
                </div>

            <transition name="fadeHeight" mode="out-in">
                <div v-if="isHovering" class="options">
                    <template v-if="isPaused">
                        <button @click="start" class="options-button" :class="{disabled:timeIsEmpty}" :disabled="timeIsEmpty">&#9654;<br>Start</button>
                    </template>
                    <template v-else>
                        <button @click="stop" class="options-button">||<span>Pause</span></button>
                    </template>
                    <button @click="reset" class="options-button">&#8634;<br>reset</button>
                    <button @click="clear" class="options-button">&#9932;<br>clear</button>
                </div>
            </transition>

                <a @click="toggleSettings(timer._id)" class="toggleButton">
                    <span class="material-symbols-outlined">settings</span></a>
                <a @click="deleteTimer(timer._id)" class="deleteButton">&#9932;</a>

                </div>
                <div class="timer-progress">
                   <div class="progress-bar-container">
                       <div class="progress-bar-text">{{ percentLeft }} %</div>
                       <div class="progress-bar-background">{{ percentLeft }} %</div>
                       <div class="progress-bar" :style="[{width: percentLeft + '%' },{ animation: 'colorChange 2s both'},{'background-color':progressColor}]"></div>
                   </div>
                </div>
            </div>
        </div>
</div>
</template>
<style scoped>

.timer {
    font-family: 'Share Tech Mono', sans-serif;
    /* margin: .5em;  */
    border-radius: 10px; 
    text-align: center; 
    position: relative;
    width: 100%;
}

.timer-name {
    color: lime;
}

.timer-name-input {
    color: white;
    background-color: black;
    border: none;
    font-size: 1.5em;
    text-align: center;
    border: 1px solid white;
}

/* Timer Settings Buttons */
.edit-button {
    position: absolute;
    top: 0;
    right: 2em;
}

.time-left {
    color: white;
}

.toggleButton {
    position: absolute;
    top: 10px;
    right: 35px;
    cursor: pointer;
}

.deleteButton {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
}

.deleteButton:hover {
    color: white;
}

button {
    margin: 0.5em;
}
input[type=number] {
    font-size: 1em;
    padding: .5em 0.6em;
    /* width: 100px; */
    width: 65px;
    /* width: 55px; */
    /* background-color: black;
    color: lime;
    border: 2px solid lime; */
}

.progress-bar {
    transition: width 1s;
    background-color: limegreen;
    
    animation: colorChange;
}
.timerFinished {
    animation: shake 0.5s;
    animation-iteration-count: 5;
}
@keyframes shake {
   0%  { transform: translate(1px, 1px)      rotate(0deg);  }
  10%  { transform: translate(-1px, -2px)    rotate(-1deg); }
  20%  { transform: translate(-3px, 0px)     rotate(1deg);  }
  30%  { transform: translate(3px, 2px)      rotate(0deg);  }
  40%  { transform: translate(1px, -1px)     rotate(1deg);  }
  50%  { transform: translate(-1px, 2px)     rotate(-1deg); }
  60%  { transform: translate(-3px, 1px)     rotate(0deg);  }
  70%  { transform: translate(3px, 1px)      rotate(-1deg); }
  80%  { transform: translate(-1px, -1px)    rotate(1deg);  }
  90%  { transform: translate(1px, 2px)      rotate(0deg);  }
  100% { transform: translate(1px, -2px)    rotate(-1deg);  }
}
.progress-bar-container {
    position: relative;
    width: 100%;
    height: 25px;
    text-align: center;
}
.progress-bar {
    position: absolute;
    top: 0;
    height: 25px;
}
.progress-bar-text {
    position: absolute;
    top: 0;
    color: white;
    width: 100%;
    font-weight: bold;
    z-index: 1;
    text-shadow: 2px 2px black;
}
.progress-bar-background {
    background-color: black;
    position: absolute;
    top: 0;
    width: 100%;
    color: white;
    font-weight: bold;
}







/* Circular ProgressBar */
.circular-progress {
    text-align: center;
    margin: 20px auto;
}

@keyframes growProgressBar {
  0%, 33% { --pgPercentage: 0; }
  /* 100% { --pgPercentage: var(--value); } */
  100% { --pgPercentage: v-bind(percentLeft) }
}

@property --pgPercentage {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}

div[role="progressbar"] {
  --size: 12rem;
  --fg: lime;
  --bg: black;
  --pgPercentage: var(--value);
  animation: growProgressBar 2s 1 forwards;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: 
    radial-gradient(closest-side, #181818 80%, transparent 0 99.9%, #181818 0),
    conic-gradient(var(--fg) calc(var(--pgPercentage) * 1%), var(--bg) 0)
    ;
  font-family: Helvetica, Arial, sans-serif;
  font-size: calc(var(--size) / 5);
  color: var(--fg);
}

div[role="progressbar"]::before {
  counter-reset: percentage v-bind(percentLeft);
  content: counter(percentage) '%';
}



/* compact-timer */
.compact-timer {
    outline: 1px dashed lime;
    position: relative;
}
.content {
    display: flex;
    flex-direction: column;
    flex: 3;
}
.main {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.main img {
    flex: 1;
}

/* .options {
    position: absolute;
    z-index: 999999;
    background-color: rgba(14, 161, 219, 0.3);
    backdrop-filter: blur(3px);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.options button {
    background-color: transparent;
    border: none;
    color: white;
    font-weight: 800;
    cursor: pointer;
    font-size: 36px;
} */


/* Nav Timer Layout */

.nav-timer {
    display: flex;
    flex-direction: row;
    outline: 1px solid lime;
    background-color: #041e27de;
}

.nav-img {
    display: flex;
    justify-content: stretch;
    align-items: center;
    flex: 1fr;
    background-color: rgb(0, 0, 0);
    border: 1px solid lime;
    position: relative;
}

.nav-img img {
    min-width: 10px;
    max-width: 100px;
    aspect-ratio: 1;
    padding: 10px;
}

.edit-nav-img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 255, 0, 0.25);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.hide {
    display: none;
}

.nav-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 3;
}

.time-left {
    font-size: 36px;
}

.edit-button {
    position: absolute;
    top: 10px;
    right: 40px;
    cursor: pointer;
}

.edit-button:hover {
    color: white;
}

.time-left-controls {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
}

.input-control {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.input-control-value {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Action buttons */
.options {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.options-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Share Tech Mono', sans-serif;
    color: #ebebeba3;
    cursor: pointer;
    font-size: 1em;
    padding: 5px 15px;
    background-color: transparent;
    border: none;
}
.options-button span {
    padding: 0.25em;
    font-size: .65em;
}

.options-button:hover {
    color: white;
}

.disabled {
    color: black !important;
}

.add-time {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.add-time-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Share Tech Mono', sans-serif;
    color: #ebebeba3;
    cursor: pointer;
    font-size: 1em;
    /* padding: 5px 15px; */
    /* margin: 10px; */
    background-color: transparent;
    border: none;
}

.add-time-button:hover {
    color: white;
}







/* Modals */
.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 80%;
    width: 80%;
    background: black;
    outline: 1px solid white;
    text-align: center;
    position: fixed;
    overflow: auto;
  }

  .modal-bg {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(3px);
  }



  /* Animate open */
  .fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.5s;
  max-height: 430px;
}
.fadeHeight-enter,
.fadeHeight-leave-to
{
  opacity: 0;
  max-height: 0px;
}
</style>
