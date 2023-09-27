<script setup>
import { ref } from 'vue'

var time = ref('00:00:00.000')
var timeBegan = ref(null)
var timeStopped = ref(null)
var stoppedDuration = ref(0)
var started = ref(null)
var running = ref(false)

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
    time.value = "00:00:00.000";
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
                  zeroPrefix(ms, 3);
}

function zeroPrefix(num, digit)  {
    var zero = '';
    for(var i = 0; i < digit; i++){
    zero += '0';
    }
    return (zero + num).slice(-digit);
}
</script>

<template>
    <div id="clock">
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
     font-family: 'Share Tech Mono', sans-serif;
	 order: 0;
	 flex: 0 1 auto;
	 align-self: center;
     text-align: center;
	 /* color: #c8c8c8; */
     color: lime;
}
 #clock .time {
	 font-size: 6.5em;
}
 #clock .text {
	 margin-top: 30px;
	 font-size: 1em;
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
	 margin-top: 15px;
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
	 font-size: 2em;
	 cursor: pointer;
	 flex-grow: 1;
	 transition: color 0.1s ease-out;
}
 #clock .btn-container a:hover {
	 color: white;
}
 
</style>