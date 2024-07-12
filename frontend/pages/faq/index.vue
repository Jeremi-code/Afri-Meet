<template>
    <div class="mx-auto max-w-4xl py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div class="space-y-8">
            <div class="text-center">
                <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Frequently Asked Questions
                </h1>
                <p class="mt-4 text-lg text-muted-foreground">Get answers to the most common questions about our
                    platform.</p>
            </div>
        </div>
        <div class="space-y-6 mt-6">
            <UAccordion open-icon="i-heroicons-plus" close-icon="i-heroicons-minus" :items="items" />
        </div>
    </div>
</template>

<script setup lang="ts">
const items = [
    { label: '1. What is Afri Meet?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
    { label: '2. Getting Started', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
    { label: '3. Scheduling Meetings', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
    { label: '4. Notifiactions', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }
];
</script>