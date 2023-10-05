<script setup>
import { ref, computed, watch } from 'vue'
import { useTimerStore } from '../../stores/timer.store';

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

const isDisabled = computed(() => {
    if(days.value == 0 && hours.value == 0 && minutes.value == 0 && seconds.value == 0) return true;
})

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

// Editing Timer Settings
// const isEditingTimer = ref(false);
// function toggleEditTimer() {
//     isEditingTimer.value = !isEditingTimer.value
// }

// Editing Timer Time
const isEditing = ref(false)
const isHovering = ref(false)
const isPaused = ref(true)

const changeTimerIcon = () => {
    alert("Attempting to change timer image")
}

const timeIsEmpty = computed(() => {
    return timeToZero.value === 0;
})

</script>
<template>
    <div class="timer" :class="{ timerFinished: timesUp }">

    <!-- <div class="options" v-if="isHovering" @mouseleave="isHovering = false">
        <a @click="deleteTimer(timer._id)" class="deleteButton">&#9932;</a>
        <button @click="toggleEditMode" class="edit-button">&#x270E;</button>

        <template v-if="isPaused">
            <button @click="start">&#9654;</button>
        </template>
        <template v-else>
            <button @click="stop">||</button>
        </template>
        <button @click="edit">&#x270E;</button>
        <button @click="reset">&#8634;</button>
        <button @click="clear" class="clear-button">&#9212;</button>
    </div> -->

    <div class="nav-timer">
         <div class="nav-img" @dblclick="changeTimerIcon">
            <img :src="timer.img" alt="" v-if="timer.img">
            <img src="https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg" width="80px" alt="" v-else>
            <!-- <img :src='`${timer.img}` || "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg"' alt="Timer Image"> -->
         </div>
         
            <div class="nav-content" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
                <div class="timer-title">
                    <template v-if="isEditingTimerName">
                        <input type="text" v-model="editTimer.name" @blur="updateTimerName" class="timer-name-input">
                    </template>
                    <template v-else>
                        <h2 @dblclick="editName" class="timer-name">{{ timer.name }}</h2>
                    </template>
                </div>
                <div class="timer-value">
                    <template v-if="isHovering">

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
                    </template>
                    <template v-else>
                        <h2 class="time-left">
                            <span>{{ msToTime(timeToZero)[0] }}{{ msToTime(timeToZero)[1] }}:</span>
                            <span>{{ msToTime(timeToZero)[3] }}{{ msToTime(timeToZero)[4] }}:</span>
                            <span>{{ msToTime(timeToZero)[6] }}{{ msToTime(timeToZero)[7] }}:</span>
                            <span>{{ msToTime(timeToZero)[9] }}{{ msToTime(timeToZero)[10] }}</span>
                        </h2>
                    </template>

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

                <a @click="deleteTimer(timer._id)" class="deleteButton">&#9932;</a>

                </div>
                <div class="timer-progress">
                   <div class="progress-bar-container">
                       <div class="progress-bar-text">{{ percentLeft }} %</div>
                       <div class="progress-bar-background">{{ percentLeft }} %</div>
                       <div class="progress-bar" :style="[{width: percentLeft + '%' },{ animation: 'colorChange 2s both'}]"></div>
                   </div>
                </div>

                <!-- Manually Add Time -->
                <!-- <div>
                    <button @click="addTime(1)">+1</button>
                    <button @click="addTime(5)">+5</button>
                    <button @click="addTime(15)">+15</button>
                </div> -->
            </div>
        </div>
</div>
</template>
<style scoped>

.timer {
    font-family: 'Share Tech Mono', sans-serif;
    margin: 1em; 
    border-radius: 10px; 
    text-align: center; 
    position: relative;
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
    font-size: 24px;
    /* width: 100px; */
    width: 55px;
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
    z-index: 1;
    width: 100%;
    font-weight: bold;
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
}

.nav-img {
    display: flex;
    justify-content: stretch;
    align-items: center;
    flex: 1fr;
}

.nav-img img {
    min-width: 100px;
    aspect-ratio: 1;
    padding: 10px;
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
    margin: 10px;
    background-color: transparent;
    border: none;
}

.options-button:hover {
    color: white;
}

.disabled {
    color: black !important;
}

.options-button span {
    padding: 0.5em;
    font-size: .65em;
}

.options {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

</style>
