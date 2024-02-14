<script setup>
    defineProps(['todo'])
</script>
<template>
    <div>
        <pre>
            {{ todo.title }}
        </pre>
    </div>
</template>