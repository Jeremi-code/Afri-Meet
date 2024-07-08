<script setup lang="ts">
import TypeEffect from '~/components/TypeEffect.vue';
</script>

<template>
    <div class="flex justify-center mb-30 items-center bg-white h-screen w-full flex-col text-center text-black ">
        <div class="mb-16 -mt-20">
            <div class="mb-2">
                <TypeEffect/>
            </div>
            <h1 class=" text-4xl font-bold mb-2">Making your meeting schedules a breathe.</h1>
            <p class="text-lg">Reserve venues and invite participants to your meetings.</p>
        <UContainer class="mt-6">
            <UButton color="primary" class="mr-4 p-3" to="/meetings">Schedule Meeting</UButton>
        </UContainer>
        </div>
    </div>
</template>