<script setup>
  import AccordionPanel from '../components/accordion/AccordionPanel.vue';
  import Contact from '../components/Form/Contact.vue';
</script>

<template>
  <div class="accordion-container">
    <div class="title">
      <h2>Payment</h2>
      <h2>Order #98765</h2>
    </div>
    <form>
      <AccordionPanel
        aria-title="contact"
        title="Contact Information">
        <Contact></Contact>
      </AccordionPanel>
      <AccordionPanel
        aria-title="contact"
        title="Contact Information">
        <Contact></Contact>
      </AccordionPanel>
      <AccordionPanel aria-title="Woah" title="this is a test">
        <h2>Test</h2>
        <h2>Ok?</h2>
        What goes in here?
      </AccordionPanel>
    </form>
  </div>
</template>

<style scoped>
h2 {
    font-size: 1.5rem;
    line-height: 2rem; 
}

.accordion-container {
    padding: 1rem;
    /* border: 1px solid white; */
}

.title {
    display: flex; 
    padding-top: 0.5rem;
    padding-bottom: 0.5rem; 
    margin-bottom: 1rem; 
    flex-direction: row; 
    justify-content: space-between; 
    align-items: center; 
    border-bottom-width: 2px; 

}


</style>