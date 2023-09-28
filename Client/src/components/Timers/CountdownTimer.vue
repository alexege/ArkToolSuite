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
        }
    }, actualDelay)
}

function updateStart() {
    startDuration.value = timeToZero.value
}

function stop() {
    clearTimeout(timeOut.value)
}

function reset() {
    clearTimeout(timeOut.value)
    timeToZero.value = inputStartTime.value
}

function clear() {
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

const { updateTimer } = useTimerStore()
const isEditingTimerName = ref(false);
const editTimer = {
    name: 'Name'
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

</script>
<template>
    <div class="timer" :class="{ timerFinished: timesUp }">
        <template v-if="isEditingTimerName">
            <input type="text" v-model="editTimer.name" @blur="updateTimerName">
        </template>
        <template v-else>
            <h2 @dblclick="editName">{{ timer.name }}</h2>
        </template>

        <!-- Circular ProgressBar -->
        <div class="circular-progress" role="progressbar" :aria-valuenow="percentLeft" aria-valuemin="0" aria-valuemax="100" style="--value:percentLeft"></div>

        <a @click="deleteTimer(timer._id)" class="deleteButton">x</a>

        <div v-if="timer.img">
            <img  :src='`${timer.img}`' alt="" style="width: 200px; height: 150px;">
        </div>

        <!-- Input Values -->
        <div>
            <input type="number" min="0" max="100" v-model="days" placeholder="Days" @change="updateStart()">d :
            <input type="number" min="0" max="24" v-model="hours" placeholder="Hours" @change="updateStart()">h :
            <input type="number" min="0" max="60" v-model="minutes" placeholder="Minutes" @change="updateStart()">m :
            <input type="number" min="0" max="60" v-model="seconds" placeholder="Seconds" @change="updateStart()">s  
        </div>

        <!-- Controls -->
        <div>
            <button @click="start" ref="startToggle" :disabled="isDisabled">Start</button>
            <button @click="stop">Stop</button>
            <button @click="reset">Reset</button>
            <button @click="clear">Clear</button>
        </div>

        <!-- Manually Add Time -->
        <div>
            <button @click="addTime(1)">+1</button>
            <button @click="addTime(5)">+5</button>
            <button @click="addTime(15)">+15</button>
        </div>
        <h2 class="time-left">{{ msToTime(timeToZero) }}</h2>
        
        <!-- Progress Bar -->
        <div class="progress-bar-container">
            <div class="progress-bar-text">{{ percentLeft }} %</div>
            <div class="progress-bar-background">{{ percentLeft }} %</div>
            <div class="progress-bar" :style="[{width: percentLeft + '%' },{ animation: 'colorChange 2s both'}]"></div>
        </div>
    </div>
</template>
<style scoped>

.timer {
    border: 1px solid black;
    /* background-color: #4d906e; */
    padding: 1em; 
    margin: 1em; 
    border-radius: 10px; 
    text-align: center; 
    position: relative;
}

button {
    padding: 10px;
    background-color: transparent;
    border-radius: 20px;
    color: lime;
    background-color: black;
}

button:hover {
    cursor: pointer;
}

.time-left {
    color: white;
}

.deleteButton {
    position: absolute;
    top: 10px;
    right: 15px;
}

button {
    margin: 0.5em;
}
input[type=number] {
    font-size: 24px;
    width: 100px;
    /* width: 45px; */
    background-color: black;
    color: lime;
    border: 2px solid lime;
}

/* input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button {  
   opacity: 1;

} */

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
    height: 40px;
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

</style>