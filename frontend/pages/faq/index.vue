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
        <div class="space-y-6 mt-6 max-w-l">
            <UAccordion open-icon="i-heroicons-plus" close-icon="i-heroicons-minus" :items="items" size="xl"/>
        </div>
    </div>
</template>

<script setup lang="ts">
const items = [
    { label: '1. What is Afri Meet?', content: 'Afri Meet is the internal tool used at Afriwork to schedule meetings and reserve venues for those meetings.' },
    { label: '2. How do I get started?', content: 'Register, then Login to your account. Next, start navigating around the Afri Meet platform using the top navigation bar.' },
    { label: '3. How do I schedule meetings?', content: 'Head over to the rooms page using the top navigation bar, and start by choosing a room suitable for your meeting, click the schedule button to make your meeting one step closer to becoming a reality.' },
    { label: '4. What are notifiactions?', content: 'Notifications are sent as reminders to meeting participants at a regular interval.' }
];
</script>