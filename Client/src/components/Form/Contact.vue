<script setup>
  import { reactive } from 'vue';

  const state = reactive({
    fullName: '',
    email: '',
    phoneNumber: ''
  });
</script>

<template>
  <div class="input">
    <label
      class="font-semibold"
      for="fullName">Full Name</label>
    <input
      class="block inner-shadow rounded border-2 w-full mt-2 p-1"
      type="text"
      id="fullName"
      name="fullName"
    />
  </div>
  <div class="input mt-4">
    <label class="font-semibold" for="email">Email</label>
    <input
      class="block inner-shadow rounded border-2 w-3/5 mt-2 p-1"
      type="text"
      id="email"
      name="email"
    />
  </div>
  <div class="input mt-4">
    <label class="font-semibold" for="phoneNumber">Phone Number</label>
    <input
      class="block inner-shadow rounded border-2 w-1/2 mt-2 p-1"
      type="text"
      id="phoneNumber"
      name="phoneNumber"
    />
  </div>
</template>