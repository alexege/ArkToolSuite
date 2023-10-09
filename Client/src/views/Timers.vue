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
        name: 'Timer Name',
        type: type,
        creator: null,
        img: 'https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg'
    }

    await addTimer(data)
    .then((res) => {
        console.log("added item with result:", res);
    })
}
</script>
<template>
    <div>
        <h2>Timers</h2>
        
        <div class="timer-container">
            <div class="stopwatches">
                <StopwatchTimer v-for="timer in allStopwatchTimers" :key="timer._id" :timer="timer" @close="close"/>
                <button class="add-timer-button" @click="add('stopWatch')">+</button>
            </div>
            
            
            <div class="countdowns">
                <CountdownTimer v-for="timer in allCountDownTimers" :key="timer._id"  :timer="timer" @close="close"/>
                <button class="add-timer-button" @click="add('countDown')">+</button>
            </div>
        </div>

    </div>
</template>
<style scoped>
h2{
    text-align: center;
    color: white;
    font-size: 36px;
}

.timer-container {
    display: flex;
    flex-direction: row;
    align-content: start;
    gap: 20px;
}

.stopwatches {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
}

.countdowns {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
}

.add-timer-button {
    /* width: 100%; */
    width: 50px;
    display: block;
    background: transparent;
    border: 1px solid lime;
    color: white;
    padding: 1em;
    margin: 15px;
    cursor: pointer;
}

.add-timer-button:hover {
    background: rgba(0, 255, 0, 0.25)
}
</style>