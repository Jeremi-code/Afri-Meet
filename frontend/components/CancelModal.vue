<template>
    <button @click="isOpen = true"
      class="bg-red-500 text-white hover:bg-red-600 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3">
      Cancel
    </button>
    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Cancel Meeting
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpen = false" />
          </div>
        </template>
        <h3 class="text-center">Are you sure?</h3>
        <template class="flex justify-center px-4 mt-2">
          <UButton class="px-12 bg-gray-500 text-white hover:bg-gray-600 h-9 rounded-md mx-2"
            label="Cancel" @click="onCancel" />
          <UButton class="px-12 bg-red-500 text-white hover:bg-red-600 h-9 rounded-md mx-2"
            label="Ok" @click="onConfirm" />
        </template>
      </UCard>
    </UModal>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { defineEmits } from 'vue';
  
  const isOpen = ref(false);
  const emit = defineEmits(['confirm', 'cancel']);
  
  const onConfirm = () => {
    emit('confirm');
    isOpen.value=false
  };
  
  const onCancel = () => {
    emit('cancel');
    isOpen.value=false
  };
  </script>
  