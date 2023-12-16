<script setup>
import { ref } from 'vue'
import { useTimerStore } from '../../stores/timer.store';

var time = ref('00:00:00:00')
var timeBegan = ref(null)
var timeStopped = ref(null)
var stoppedDuration = ref(0)
var started = ref(null)
var running = ref(false)
const props = defineProps(['timer'])
const emit = defineEmits(['close'])

function start() {
    if(running.value) return;
    if(timeBegan.value === null) {
        reset();
        timeBegan.value = new Date();
    }
    if(timeStopped.value !== null) {
        stoppedDuration.value += (new Date() - timeStopped.value);
    }
    started.value = setInterval(clockRunning, 10);
    running.value = true;
}

function stop()  {
    running.value = false;
    timeStopped.value = new Date();
    clearInterval(started.value);
}

function reset() {
    running.value = false;
    clearInterval(started.value);
    stoppedDuration.value = 0;
    timeBegan.value = null;
    timeStopped.value = null;
    time.value = "00:00:00:00";
}

function clockRunning() {
      var currentTime = new Date()
      var timeElapsed = new Date(currentTime - timeBegan.value - stoppedDuration.value)
      var hour = timeElapsed.getUTCHours()
      var min = timeElapsed.getUTCMinutes()
      var sec = timeElapsed.getUTCSeconds()
      var ms = timeElapsed.getUTCMilliseconds()
      time.value = zeroPrefix(hour, 2) + ":" +
                  zeroPrefix(min, 2) + ":" +
                  zeroPrefix(sec, 2) + ":" +
                  zeroPrefix(ms, 2);
}

function zeroPrefix(num, digit)  {
    var zero = '';
    for(var i = 0; i < digit; i++){
    zero += '0';
    }
    return (zero + num).slice(-digit);
}

function deleteTimer(timerId) {
    emit('close', timerId)
}

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
    <div id="clock" >
        <a @click="deleteTimer(timer._id)" class="deleteButton">&#9932;</a>
        <template v-if="isEditingTimerName">
            <input type="text" v-model="editTimer.name" @blur="updateTimerName" @keydown.enter="updateTimerName">
        </template>
        <template v-else>
            <h2 @dblclick="editName">{{ timer.name }}</h2>
        </template>
        <span class="time">{{ time }}</span>

        <div class="btn-container">
        <a id="start" @click="start">Start</a>
        <a id="stop" @click="stop">Stop</a>
        <a id="reset" @click="reset">Reset</a>
        </div>
    </div>
</template>
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
 
 #clock {
     position: relative;
     font-family: 'Share Tech Mono', sans-serif;
	 order: 0;
     display: flex;
     flex-direction: column;
	 flex: 0 1 auto;
	 align-items: center;
     /* text-align: center; */
     justify-content: center;
	 /* color: #c8c8c8; */
     color: lime;
     outline: 1px solid lime;
     background-color: #041e27de;
     width: 100%;
     height: 100%;
}

#clock h2 {
    font-size: 1.5em;
}

 #clock .time {
	 font-size: 36px;
     color: white;
}
 #clock .text {
	 margin-top: 30px;
     font-size: 15px;
	 color: rgba(200, 200, 200, .4);
	 text-align: center;
}
 #clock .text a {
	 text-decoration: none;
	 color: inherit;
	 transition: color 0.1s ease-out;
}
 #clock .text a:hover {
	 color: #c8c8c8;
}
 #clock .btn-container {
	 display: flex;
}
 #clock .btn-container a {
	 text-align: center;
	 font-family: 'Share Tech Mono', sans-serif;
	 background: transparent;
	 border: none;
	 /* color: #c8c8c8; */
     color: lime;
	 padding: 10px 15px;
	 margin: 0 10px;
	 text-transform: uppercase;
	 /* font-size: 2em; */
	 cursor: pointer;
	 flex-grow: 1;
	 transition: color 0.1s ease-out;
}
 #clock .btn-container a:hover {
	 color: white;
}

#clock .deleteButton {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
}

#clock .deleteButton:hover {
    color: white;
}
 
</style>