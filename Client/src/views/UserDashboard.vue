<template>
<div>
    <h2>User Dashboard</h2>
    <pre>
        {{ userStore.user }}
    </pre>
</div>
</template>

<script setup>
import { useUserStore } from "../stores/user.store.js"
const userStore = useUserStore()


</script>