<script setup>
import { ref, computed, watch } from 'vue'

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

const timeOut = ref(0);
const timeToZero = ref(0);
const startDuration = ref(0);

const timesUp = ref(false);

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

    console.log(`${newDays}:${newHours}:${newMinutes}:${newSeconds}`)
})

function start() {

    var startTime = Date.now()
    var desiredDelay = 1000;
    var actualDelay = 1000;

    timeOut.value = setTimeout(() => {
        
        var actual = Date.now() - startTime;
        actualDelay = desiredDelay - (actual - desiredDelay);

        timeToZero.value -= 1000;

        

        if(timeToZero.value > 0) {
            start()
        } else {
            console.log("Timer is up!");
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
    minutes.value += mins;
}

// function isTimerDone() {
//     if(percentLeft.value == 0 || percentLeft == '0 %') return true;
// }

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

const percentLeft = computed(() => {
    let value = Math.floor(timeToZero.value / startDuration.value * 100);
    
    //If value is null, NaN or infinity, set to 100
    if(value == null || isNaN(value) || value == Infinity){
        return 100;
    }
    return value;
})

watch(percentLeft, (newVal, oldVal) => {
    if(newVal == 0) {
        timesUp.value = true
    }
})

const inputStartTime = computed(() => {
    return days.value * 86400000 + hours.value * 3600000 + minutes.value * 60000 + seconds.value * 1000;
})

</script>
<template>
    <div class="timer" :class="{ timerFinished: timesUp }">
        <h2 v-if="timer">{{ timer.name }}</h2>

        <a @click="deleteTimer(timer._id)" class="deleteButton">x</a>

        <div v-if="timer">
            <img  :src='`${timer.img}`' alt="" style="width: 200px; height: 150px;">
        </div>

        <br />
        <br />

        <!-- <h1>{{ msToTime(timeToZero) }}</h1> -->
        <input type="number" min="0" max="100" v-model="days" placeholder="Days" @change="updateStart()">d :
        <input type="number" min="0" max="24" v-model="hours" placeholder="Hours" @change="updateStart()">h :
        <input type="number" min="0" max="60" v-model="minutes" placeholder="Minutes" @change="updateStart()">m :
        <input type="number" min="0" max="60" v-model="seconds" placeholder="Seconds" @change="updateStart()">s  
        <br>
        <button @click="start" ref="startToggle" :disabled="isDisabled">Start</button>
        <button @click="stop">Stop</button>
        <button @click="reset">Reset</button>
        <button @click="clear">Clear</button>
        <br>
        <button @click="addTime(1)">+1</button>
        <button @click="addTime(5)">+5</button>
        <button @click="addTime(15)">+15</button>
        <br><h2>{{ msToTime(timeToZero) }}</h2>
        <div class="progress-bar-container">
            <div class="progress-bar-text">{{ percentLeft }} %</div>
            <div class="progress-bar-background">{{ percentLeft }} %</div>
            <div class="progress-bar" :style="[{width: percentLeft + '%' },{ animation: 'colorChange 6s both'}]"></div>
        </div>
        <!-- {{ timeToZero }} / {{ startDuration}} * 100 -->
    </div>
</template>
<style scoped>

.timer {
    border: 1px solid black; 
    padding: 1em; 
    margin: 1em; 
    border-radius: 10px; 
    text-align: center; 
    position: relative;
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
    height: 40px;
    text-align: center;
}
.progress-bar {
    position: absolute;
    top: 0;
    height: 20px;
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
</style>
