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
        
        <h2>CountDown Timers: </h2>
        
        <button @click="add('countDown')">Add Countdown</button>
        <br/><br/>
        <button @click="add('stopWatch')">Add Stopwatch</button>

        <div v-for="timer in allStopwatchTimers" :key="timer._id">
            <StopwatchTimer :timer="timer" @close="close"/>
        </div>
        <div v-for="timer in allCountDownTimers" :key="timer._id">
            <CountdownTimer :timer="timer" @close="close"/>
        </div>
    </div>
</template>
<style scoped>
h2{
    text-align: center;
}
</style>