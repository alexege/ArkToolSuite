<template>
    <div class="popup">
        <div class="popup-inner">
            <slot />
            <span class="popup-close" @click="TogglePopup()">
                <span class="material-symbols-outlined">close</span>
            </span>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['TogglePopup'])


</script>

<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0,0,0,.2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-inner {
    align-items: center;
    display: flex;
    flex-direction: column;
    background: #FFF;
    padding: 32px;
    position: relative;
}

.popup-close {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
</style>