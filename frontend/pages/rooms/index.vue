<template>
  <NuxtLayout>
    <UModal v-model="isOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Reserve {{ selectedRoom }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpen = false" />
          </div>
        </template>
        <form class="space-y-4">
          <div class="relative mt-1">
            <label for="title">Meeting Title</label>
            <UInput id="title" />
          </div>
          <div class="relative mt-1">
            <label for="room">Room</label>
            <UInputMenu v-model="selectedRoom" :options="rooms" placeholder="Select a room" id="room" />
          </div>
          <div class="relative mt-1">
            <label for="date">Date</label>
            <UInput type="date" id="date" />
          </div>
          <div class="relative mt-1">
            <label for="startTime">Start Time</label>
            <UInput id="startTime" type="time" />
          </div>
          <div class="relative mt-1">
            <label for="endTime">End Time</label>
            <UInput id="endTime" type="time" />
          </div>
          <div class="relative mt-1">
            <label for="participants">Participants</label>
            <USelectMenu v-model="selectedParticipants" multiple :options="participants" id="participants">
              <template #leading>
                <UIcon v-if="selectedParticipants.icon" :name="(selectedParticipants.icon as string)" class="w-5 h-5" />
              </template>
              <template #empty>
                None Selected
              </template>
            </USelectMenu>
          </div>
          <div class="flex justify-end mt-4">
            <UButton label="Save" />
          </div>
        </form>
      </UCard>
    </UModal>
    <section class="w-full py-12 md:py-16 lg:py-20">
      <div class="container px-4 md:px-6">
        <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div class="group relative rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-2xl">
            <!-- <a class="absolute inset-0 z-10" href="#">
              <span class="sr-only">View meeting room</span>
            </a> -->
            <img
              src="https://www.airbnb.com/rooms/18155163?adults=1&category_tag=Tag%3A8678&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=357232215&search_mode=flex_destinations_search&check_in=2024-07-13&check_out=2024-07-18&source_impression_id=p3_1718232511_P3RMjFWT39BVdZgL&previous_page_section_name=1000&federated_search_id=c0dde8b9-d7d6-4f4f-97d3-bf58b49e52de"
              width="400" height="300" alt="Meeting room" style="aspect-ratio: 400 / 300; object-fit: cover"
              class="w-full h-[200px] object-cover group-hover:opacity-80 transition-opacity" />
            <div class="p-4 bg-white dark:bg-gray-900">
              <h3 class="text-lg font-semibold tracking-tight">
                Conference Room A
              </h3>
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                <span>Capacity: 8</span>
                <div data-orientation="vertical" role="none" class="shrink-0 bg-gray-100 w-[1px] h-4"></div>
                <div
                  class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-lime-500 bg-lime-100 text-lime-500 dark:border-lime-400 dark:bg-lime-900 dark:text-lime-400"
                  data-v0-t="badge">
                  Available
                </div>
              </div>
              <div class="mt-4 flex gap-2">
                <UButton label="Reserve" @click="openModal(0)" />
                <button
                  class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex-1">
                  View Details
                </button>
              </div>
            </div>
          </div>
          <div class="group relative rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-2xl">
            <!-- <a class="absolute inset-0 z-10" href="#">
              <span class="sr-only">View meeting room</span>
            </a> -->
            <img
              src="https://www.airbnb.com/rooms/18155163?adults=1&category_tag=Tag%3A8678&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=357232215&search_mode=flex_destinations_search&check_in=2024-07-13&check_out=2024-07-18&source_impression_id=p3_1718232511_P3RMjFWT39BVdZgL&previous_page_section_name=1000&federated_search_id=c0dde8b9-d7d6-4f4f-97d3-bf58b49e52de"
              width="400" height="300" alt="Meeting room"
              class="w-full h-[200px] object-cover group-hover:opacity-80 transition-opacity"
              style="aspect-ratio: 400 / 300; object-fit: cover" />
            <div class="p-4 bg-white dark:bg-gray-900">
              <h3 class="text-lg font-semibold tracking-tight">Boardroom</h3>
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                <span>Capacity: 12</span>
                <div data-orientation="vertical" role="none" class="shrink-0 bg-gray-100 w-[1px] h-4"></div>
                <div
                  class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-red-500 bg-red-100 text-red-500 dark:border-red-400 dark:bg-red-900 dark:text-red-400"
                  data-v0-t="badge">
                  Taken
                </div>
              </div>
              <div class="mt-4 flex gap-2">
                <UButton label="Reserve" @click="openModal(1)" />
                <button
                  class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex-1">
                  View Details
                </button>
              </div>
            </div>
          </div>
          <div class="group relative rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-2xl">
            <!-- <a class="absolute inset-0 z-10" href="#">
              <span class="sr-only">View meeting room</span>
            </a> -->
            <img
              src="https://www.airbnb.com/rooms/18155163?adults=1&category_tag=Tag%3A8678&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=357232215&search_mode=flex_destinations_search&check_in=2024-07-13&check_out=2024-07-18&source_impression_id=p3_1718232511_P3RMjFWT39BVdZgL&previous_page_section_name=1000&federated_search_id=c0dde8b9-d7d6-4f4f-97d3-bf58b49e52de"
              width="400" height="300" alt="Meeting room"
              class="w-full h-[200px] object-cover group-hover:opacity-80 transition-opacity"
              style="aspect-ratio: 400 / 300; object-fit: cover" />
            <div class="p-4 bg-white dark:bg-gray-900">
              <h3 class="text-lg font-semibold tracking-tight">
                Executive Suite
              </h3>
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                <span>Capacity: 6</span>
                <div data-orientation="vertical" role="none" class="shrink-0 bg-gray-100 w-[1px] h-4"></div>
                <div
                  class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-yellow-500 bg-yellow-100 text-yellow-500 dark:border-yellow-400 dark:bg-yellow-900 dark:text-yellow-400"
                  data-v0-t="badge">
                  Locked
                </div>
              </div>
              <div class="mt-4 flex gap-2">
                <UButton label="Reserve" @click="openModal(2)" />
                <button @click="showDetails(123)"
                  class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex-1">
                  View Details
                </button>
              </div>
            </div>
          </div>
          <div class="group relative rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-2xl">
            <!-- <a class="absolute inset-0 z-10" href="#">
              <span class="sr-only">View meeting room</span>
            </a> -->
            <img
              src="https://www.airbnb.com/rooms/18155163?adults=1&category_tag=Tag%3A8678&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=357232215&search_mode=flex_destinations_search&check_in=2024-07-13&check_out=2024-07-18&source_impression_id=p3_1718232511_P3RMjFWT39BVdZgL&previous_page_section_name=1000&federated_search_id=c0dde8b9-d7d6-4f4f-97d3-bf58b49e52de"
              width="400" height="300" style="aspect-ratio: 400 / 300; object-fit: cover" alt="Meeting room"
              class="w-full h-[200px] object-cover group-hover:opacity-80 transition-opacity" />
            <div class="p-4 bg-white dark:bg-gray-900">
              <h3 class="text-lg font-semibold tracking-tight">Huddle Room</h3>
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                <span>Capacity: 4</span>
                <div data-orientation="vertical" role="none" class="shrink-0 bg-gray-100 w-[1px] h-4"></div>
                <div
                  class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-lime-500 bg-lime-100 text-lime-500 dark:border-lime-400 dark:bg-lime-900 dark:text-lime-400"
                  data-v0-t="badge">
                  Available
                </div>
              </div>
              <div class="mt-4 flex gap-2">
                <UButton label="Reserve" @click="openModal(3)" />
                <NuxtLink :to="`/rooms/${room?.id || 1}`"
                  class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex-1">
                  View Details
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
const isOpen = ref(false);

const room = ref({ id: 1 });
const rooms : string[] = ['Conference Room A ', 'Boardroom', 'Executive Suite', 'Huddle Room']
const selectedRoom = ref<string>(rooms[0])


const participants = [{
  id: 'benjamincanac',
  label: 'benjamincanac',
  href: 'https://github.com/benjamincanac',
  target: '_blank',
  avatar: { src: 'https://avatars.githubusercontent.com/u/739984?v=4' }
}, {
  id: 'Atinux',
  label: 'Atinux',
  href: 'https://github.com/Atinux',
  target: '_blank',
  avatar: { src: 'https://avatars.githubusercontent.com/u/904724?v=4' }
}, {
  id: 'smarroufin',
  label: 'smarroufin',
  href: 'https://github.com/smarroufin',
  target: '_blank',
  avatar: { src: 'https://avatars.githubusercontent.com/u/7547335?v=4' }
}, {
  id: 'nobody',
  label: 'Nobody',
  icon: 'i-heroicons-user-circle'
}]

const selectedParticipants = ref([participants[0]])

const openModal = (index: number) => {
  isOpen.value = true;
  selectedRoom.value = rooms[index];
};

const showDetails = (id: number) => {
  room.value.id = id;
};

const removeParticipant = (id: string) => {
  selectedParticipants.value = selectedParticipants.value.filter(participant.id !== id);
};


</script>