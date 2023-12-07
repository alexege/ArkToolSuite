<script setup>
import { storeToRefs } from 'pinia';
import StopwatchTimer from '../components/Timers/StopwatchTimer.vue';
import CountdownTimer from '../components/Timers/CountdownTimer.vue';
import { useTimerStore } from '../stores/timer.store.js'

const { fetchTimers } = useTimerStore()

const { addTimer, deleteTimer } = useTimerStore()

const { allTimers, allStopwatchTimers, allCountDownTimers } = storeToRefs(useTimerStore())


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
        
        <!-- <div class="timer-container">
            <div class="stopwatches">
                <StopwatchTimer v-for="timer in allStopwatchTimers" :key="timer._id" :timer="timer" @close="close"/>
                <button class="add-timer-button" @click="add('stopWatch')">+</button>
            </div>
            
            
            <div class="countdowns">
                <CountdownTimer v-for="timer in allCountDownTimers" :key="timer._id"  :timer="timer" @close="close"/>
                <button class="add-timer-button" @click="add('countDown')">+</button>
            </div>
        </div> -->

        <div class="timer-grid">
                <div v-for="timer in allTimers" :key="timer._id" >
                    <template v-if="timer.type == 'stopWatch'">
                        <StopwatchTimer :timer="timer" @close="close"/>
                    </template>
                    <template v-if="timer.type == 'countDown'">
                        <CountdownTimer :timer="timer" @close="close"/>
                    </template>
                </div>
                <!-- <StopwatchTimer v-for="timer in allTimers" :key="timer._id" :timer="timer" @close="close"/>
                <CountdownTimer v-for="timer in allTimers" :key="timer._id" :timer="timer" @close="close"/> -->
        </div>
            <button class="add-timer-button" @click="add('stopWatch')">+</button>
            <button class="add-timer-button" @click="add('countDown')">+</button>

    </div>
</template>
<style scoped>

.timer-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(5, .5fr);
    gap: .5em;
}

/* @media screen and (min-width:480px) {
    .timer-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 1em;
    }
} */

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