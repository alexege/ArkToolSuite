<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import StopwatchTimer from '../components/Timers/StopwatchTimer.vue';
import CountdownTimer from '../components/Timers/CountdownTimer.vue';
import { useTimerStore } from '../stores/timer.store.js'

const { fetchTimers } = useTimerStore()

const { addTimer, deleteTimer } = useTimerStore()

const { allTimers, allStopwatchTimers, allCountDownTimers } = storeToRefs(useTimerStore())
const activeButton = ref('both')
const displayMethod = ref('show-grid')

async function changeStyle(style) {
    console.log("Changing view method to : ", style)
    displayMethod.value = style
}

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
        
        <div class="timer-filter-buttons">
            <button @click="activeButton = 'stopwatches'" :class="{'active-button': activeButton == 'stopwatches'}">Stopwatches</button>
            <button @click="activeButton = 'countdowns'" :class="{'active-button': activeButton == 'countdowns'}">Countdowns</button>
            <button @click="activeButton = 'both'" :class="{'active-button': activeButton == 'both'}">Both</button>
        </div>

        <!-- Stopwatches -->
        <div class="timer-grid" :class="displayMethod" v-if="activeButton == 'stopwatches'">
            <StopwatchTimer v-for="timer in allStopwatchTimers" :key="timer._id" :timer="timer" @close="close"/>
        </div>
        
        <!-- Countdown Timers -->
        <div class="timer-grid" :class="displayMethod" v-if="activeButton == 'countdowns'">
            <CountdownTimer v-for="timer in allCountDownTimers" :key="timer._id"  :timer="timer" @close="close"/>
        </div>

        <!-- Both -->
        <div v-if="activeButton == 'both'">
            <template v-if="displayMethod == 'show-two-column'">
                <div class="two-columns">
                    <div class="show-two-column">
                        <StopwatchTimer v-for="timer in allStopwatchTimers" :key="timer._id" :timer="timer" @close="close"/>
                    </div>
                    <div class="show-two-column">
                        <CountdownTimer v-for="timer in allCountDownTimers" :key="timer._id"  :timer="timer" @close="close"/>
                    </div>
                </div>

            </template>
            
            <template v-else>
                <div :class="displayMethod">
                    <div v-for="timer in allTimers" :key="timer._id">
                        <StopwatchTimer v-if="timer.type == 'stopWatch'" :timer="timer" @close="close"/>
                        <CountdownTimer v-if="timer.type == 'countDown'" :timer="timer" @close="close"/>
                    </div>
                </div>
            </template>
                
        </div>

        <div class="add-button-container">
            <button class="add-timer-button" @click="add('stopWatch')" v-if="activeButton != 'countdowns'">Add Stopwatch</button>
            <button class="add-timer-button" @click="add('countDown')" v-if="activeButton != 'stopwatches'">Add Countdown</button>
        </div>

        <div class="timer-display-buttons">
            <button class="style-button" :class="{ 'active-style' : displayMethod == 'show-column'}" @click="changeStyle('show-column')">Column</button>
            <button class="style-button" :class="{ 'active-style' : displayMethod == 'show-two-column'}" @click="changeStyle('show-two-column')">Two-Column</button>
            <button class="style-button" :class="{ 'active-style' : displayMethod == 'show-grid'}" @click="changeStyle('show-grid')">Grid</button>
        </div>

    </div>
</template>
<style scoped>

.timer-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto, .5fr);
    gap: 1em;
}

/* @media screen and (min-width:480px) {
    .timer-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 1em;
    }
} */

.timer-filter-buttons {
    display: flex;
    justify-content: center;
}

.timer-filter-buttons button {
    margin: 1em;
    width: 8em;
    color: white;
    background-color: black;
    outline: 1px solid lime;
    cursor: pointer;
}

.timer-filter-buttons button:hover {
    background: rgba(0, 255, 0, 0.25)
}

.timer-filter-buttons .active-button {
    /* background: rgba(0, 255, 0, 0.25); */
    background: rgba(4, 30, 39, 0.9);
    border-style: none;
    border: 2px solid lime;
}

h2{
    text-align: center;
    color: white;
    font-size: 36px;
}

.stopwatches {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    gap: 1em;
}

.countdowns {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    gap: 1em;
}

.add-timer-button {
    /* width: 100%; */
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

.add-button-container {
    display: flex;
    justify-content: center;
}

.timer-display-buttons {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 1em;
}

.timer-display-buttons button {
    margin: .25em;
}

.show-column {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 50%;
    margin: 0 auto;
}

.two-columns {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
}

.show-two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    /* width: 100%; */
    /* margin: 0 auto; */
    /* gap: 1em; */
    /* margin: 0 1em; */
}

.column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
}

.show-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto, .5fr);
    gap: 1em;
}

.style-button {
    background-color: black;
    border: 1px solid lime;
    color: white;
    cursor: pointer;
}

.style-button:hover {
    background-color: rgba(4, 30, 39, 0.9);
}

.active-style {
    color: lime;
    border: 2px solid lime;
}
</style>