<script setup>
import { storeToRefs } from 'pinia';
import StopwatchTimer from '../components/Timers/StopwatchTimer.vue';
import CountdownTimer from '../components/Timers/CountdownTimer.vue';
import { useTimerStore } from '../stores/timer.store.js'

const { fetchTimers } = useTimerStore()

const { addTimer, deleteTimer } = useTimerStore()

const { allStopwatchTimers, allCountDownTimers } = storeToRefs(useTimerStore())


async function close(timerId) {
    await deleteTimer(timerId)
}

fetchTimers()

async function add(type) {

    var data = {
        name: 'name',
        type: type,
        creator: null,
        url: ''
    }

    await addTimer(data)
    .then((res) => {
        console.log("added item with result:", res);
    })
}
</script>
<template>
    <div>
        <h2>Timers Page</h2>
        
        <button @click="add('countDown')">Add Countdown</button>
        <br/><br/>
        <button @click="add('stopWatch')">Add Stopwatch</button>

        <div class="timer-container">
            <div class="stopwatches">
                <StopwatchTimer v-for="timer in allStopwatchTimers" :key="timer._id" :timer="timer" @close="close"/>
            </div>
    
            <div class="countdowns">
                <CountdownTimer v-for="timer in allCountDownTimers" :key="timer._id"  :timer="timer" @close="close"/>
            </div>
        </div>

    </div>
</template>
<style scoped>
h2{
    text-align: center;
}

.timer-container {
    display: flex;
    flex-direction: row;
    align-content: start;
}

.stopwatches {
    width: 50%;
}

.countdowns {
    width: 50%;
}
</style>