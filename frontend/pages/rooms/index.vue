<template>
  <NuxtLayout>
    <section class="w-full py-12 md:py-16 lg:py-20">
      <div class="container px-4 md:px-6">
        <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div v-for="room in rooms.value" :key="room.room_id"
               class="group relative rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-2xl">
            <a class="absolute inset-0 z-10" href="#">
              <span class="sr-only">View meeting room</span>
            </a>
            <img
              :src="'https://www.airbnb.com/rooms/18155163?adults=1&category_tag=Tag%3A8678&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=357232215&search_mode=flex_destinations_search&check_in=2024-07-13&check_out=2024-07-18&source_impression_id=p3_1718232511_P3RMjFWT39BVdZgL&previous_page_section_name=1000&federated_search_id=c0dde8b9-d7d6-4f4f-97d3-bf58b49e52de'"
              width="400" height="300" alt="Meeting room" style="aspect-ratio: 400 / 300; object-fit: cover;"
              class="w-full h-[200px] object-cover group-hover:opacity-80 transition-opacity" />
            <div class="p-4 bg-white dark:bg-gray-900">
              <h3 class="text-lg font-semibold tracking-tight">{{ room.room_name }}</h3>
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                <span>Capacity: {{ room.capacity }}</span>
                <div data-orientation="vertical" role="none" class="shrink-0 bg-gray-100 w-[1px] h-4"></div>
                <div
                  class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-lime-500 bg-lime-100 text-lime-500 dark:border-lime-400 dark:bg-lime-900 dark:text-lime-400"
                  data-v0-t="badge">
                  Available <!-- You can conditionally render based on room availability -->
                </div>
              </div>
              <div class="mt-4 flex gap-2">
                <button
                  class="text-white inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 flex-1">
                  Reserve
                </button>
                <button
                  @click="showDetails(room.room_id)"
                  class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex-1">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useApolloQuery } from '~/apollo/useApolloQuery';
import { ref, onMounted, watchEffect } from 'vue'; // Import ref, onMounted, and watchEffect from Vue

import { GetRoomsDocument, type GetRoomsQuery } from '~/gqlGen/types';

const { result, loading, error, refetch } = useApolloQuery(GetRoomsDocument, {}, { enabled: false });

const rooms = ref<GetRoomsQuery['rooms']>([]);

onMounted(async () => {
  await refetch();
  if (result.value) {
    rooms.value = result.value.rooms || []; 
    console.log(result.value.rooms)// Set rooms.value to the fetched rooms array
  }
});

// Function to show room details
const showDetails = (roomId: number) => {
  console.log(`Showing details for room with ID: ${roomId}`);
  // Implement logic to show room details, e.g., navigate to room details page
};
</script>

<style scoped>
/* Add any scoped styles you need */
</style>
