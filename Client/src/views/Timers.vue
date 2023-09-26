<script setup>
import StopwatchTimer from '../components/Timers/StopwatchTimer.vue';
import CountdownTimer from '../components/Timers/CountdownTimer.vue';
</script>
<template>
    <div>
        <h2>Timers Page</h2>
        <StopwatchTimer />
        <CountdownTimer />
    </div>
</template>
<style scoped>
h2{
    text-align: center;
}
</style>