<script setup lang="ts">
defineProps<{
    to: string
    label: string
}>()
</script>
<template>
    <ULink active-class="font-bold border-b-gray-600 border-b-2" class="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
        :to>
        {{ label }}
    </ULink>
</template>