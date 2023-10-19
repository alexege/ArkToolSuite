<script setup>
  import { ref } from 'vue';

  const props = defineProps({
    title: { type: String, required: true },
    ariaTitle: { type: String, required: true },
    icon: { type: String, required: false }
  });
  const showPanel = ref(false);
  const togglePanel = (event) => {
    showPanel.value = !showPanel.value;
  }
</script>

<template>
    <div class="accordion-container">
      <button
        :arial-controls="'accordion-content-' + ariaTitle"
        :id="'accordion-control-' + ariaTitle"
        
        class="title">
        <span v-if="icon" class="material-icons">{{ icon }}</span>
        {{ title }}
        <div @click.prevent="togglePanel">
          <span class="material-icons" v-if="showPanel">expand_more</span>
          <span class="material-icons" v-else >chevron_right</span>
        </div>
      </button>
      <div
        :aria-hidden="!showPanel"
        :id="'content-' + ariaTitle"
        class="panel-content"
        v-if="showPanel">
        <slot></slot>
      </div>
    </div>
  </template>
<style scoped>
.accordion-container {
    margin-bottom: 1rem; 
    border-radius: 0.5rem; 
    /* border: 1px solid white; */
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 
}

.panel-content {
  /* padding: 0 1rem; */

}

.title {
    display: flex; 
    padding: 1rem; 
    flex-direction: row; 
    justify-content: space-between; 
    align-items: center; 
    border-bottom-width: 2px; 
    width: 100%; 
    font-weight: 600; 
}
</style>