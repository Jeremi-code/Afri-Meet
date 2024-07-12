<script setup lang="ts">
import TypeEffect from '~/components/TypeEffect.vue';
</script>

<template>
    <div class="flex flex-col grow justify-center items-center bg-white text-center text-black mx-4 ">
        <div>
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