<script setup>
import { defineEmits, defineProps } from 'vue'
const props = defineProps(['items'])
const emit = defineEmits(['close', 'selected-image'])

const close = () => {
  emit('close')
}

function selectImg(url) {
    emit('selected-image', url)
}

</script>

<template>
    <div>
        <div class="wrapper">
            <span class="close" @click="close">X</span>
            <slot></slot>
            <div class="grid">
                <div v-for="item in props.items" :key="item._id" class="grid-item">
                    <div class="block-cell">
                        <div class="block">
                            <label>{{ item.title }}</label>
                            <img :src="item.url" :alt="item.title" @click="selectImg(item.title)">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    position: relative;
}
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
}

.grid-item {
    margin: 0 auto;
}

.close {
    position: absolute;
    top: .25em;
    right: .25em;
    cursor: pointer;
}

.block {
  min-width: 50px;
  min-height: 50px;
  aspect-ratio: 1;
  border-radius: 3px;
  padding: .5em;
  margin: .5em;
  text-align: center;
  display: flex;
  flex-direction: column;
  /* justify-content: stretch; */
  justify-content: center;
  /* align-items: center; */
  /* align-content: center; */
  color: #FFF;
  background-color: rgb(63, 63, 63);
  font-size: 8pt;
}

.block-cell {
  min-width: 50px;
  min-height: 50px;

  max-width: 100px;
  max-height: 100px;

  /* aspect-ratio: 1; */
  border-radius: 3px;
  /* padding: .5em;
  margin: .5em; */
  /* text-align: center; */
  /* display: flex; */
  flex-direction: column;
  justify-content: stretch;
  align-content: center;
  color: #FFF;
  /* background-color: rgb(63, 63, 63); */
  /* outline: 1px solid white; */
  font-size: 8pt;
  display: flex;
  /* margin: 2px */
}

.block:hover {
    background-color: rgb(102, 102, 102);
    outline: 2px solid lime;
    /* transform: rotate(10deg);
    animation: 2s; */
    transition-property: transform;
    transition-duration: .25s;
    transform: scale(105%);
    box-shadow: 1px 1px 20px 5px rgba(255, 255, 255, 0.205);
    /* border-top: 1px solid white;
    border-left: 1px solid white; */
    cursor: pointer;
}

.block img {
    /* aspect-ratio: 1; */
    max-height: 100%;
    max-width: 100%;
}
</style>