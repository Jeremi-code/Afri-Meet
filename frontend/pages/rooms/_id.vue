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
                <UIcon v-if="selectedParticipants?.icon" :name="(selectedParticipants.icon as string)" class="w-5 h-5" />
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
    <div class="max-w-6xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="relative rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-2xl">
          <img
            src="https://www.airbnb.com/rooms/18155163?adults=1&category_tag=Tag%3A8678&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=357232215&search_mode=flex_destinations_search&check_in=2024-07-13&check_out=2024-07-18&source_impression_id=p3_1718232511_P3RMjFWT39BVdZgL&previous_page_section_name=1000&federated_search_id=c0dde8b9-d7d6-4f4f-97d3-bf58b49e52deg"
            width="800" height="600" alt="Meeting room"
            class="w-full h-[400px] object-cover group-hover:opacity-80 transition-opacity"
            style="aspect-ratio: 800 / 600; object-fit: cover;" />
        </div>
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold tracking-tight">Conference Room A</h1>
            <p class="text-gray-500 dark:text-gray-400 mt-2">Capacity: 8 people</p>
          </div>
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold">Room Details</h2>
            <div class="prose prose-stone">
              <p>
                Our Conference Room A is a spacious and modern meeting space that can accommodate up to 8 people. It's
                perfect for team meetings, client presentations, or small group discussions.
              </p>
              <p>
                The room is equipped with a large conference table, comfortable chairs, and high-speed Wi-Fi to ensure a
                productive and collaborative environment. You'll also find a wall-mounted display for presentations and
                a whiteboard for brainstorming sessions.
              </p>
              <p>
                The room is flooded with natural light from the large windows, creating a bright and airy atmosphere.
                The space is also climate-controlled, ensuring a comfortable temperature throughout your meeting.light
                from the large windows,
              </p>
            </div>
          </div>
          <div class="flex gap-4">
            <UButton label="Reserve" @click="openModal(0)" />
            <button
              class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 flex-1">
              View Details
            </button>
          </div>
        </div>
      </div>
      <div class="mt-12">
        <h2 class="text-2xl font-semibold mb-4">Upcoming Meetings</h2>
        <div class="grid gap-4">
          <div class="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-4 flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold">Marketing Team Meeting</h3>
              <p class="text-gray-500 dark:text-gray-400">10:00:00 AM</p>
            </div>
            <div class="flex items-center gap-2">
              <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                data-v0-t="badge">
                Past
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-4 flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold">Sales Team Presentation</h3>
              <p class="text-gray-500 dark:text-gray-400">02:00:00 PM</p>
            </div>
            <div class="flex items-center gap-2">
              <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-200 dark:bg-green-700 text-green-500 dark:text-green-400"
                data-v0-t="badge">
                Now
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-4 flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold">Product Design Review</h3>
              <p class="text-gray-500 dark:text-gray-400">04:00:00 PM</p>
            </div>
            <div class="flex items-center gap-2"></div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const isOpen = ref(false);

const room = ref({ id: 1 });
const rooms:string[] = ['Conference Room A ', 'Boardroom', 'Executive Suite', 'Huddle Room']
const selectedRoom = ref<string>(rooms[0])

interface participants {
  id : string,
  label : string,
  href? : string,
  target? : string,
  avatar? : {src : string},
  icon? : string
}


const participants:participants[] = [{
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
  avatar: { src: 'https://avatars.githubusercontent.com/u/904724?v=4' },
  icon: 'i-heroicons-user-circle'
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
onMounted(() => {
  console.log(selectedRoom.value)
  console.log('ermi')
})
const selectedParticipants = ref<participants>(participants[0])

const openModal = (index: number) => {
  isOpen.value = true;
  selectedRoom.value = rooms[index];
};

const showDetails = (id: number) => {
  room.value.id = id;
};


</script>

<style scoped></style>