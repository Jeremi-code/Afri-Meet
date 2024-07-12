<template>
  <NuxtLayout>
    <section class="w-full py-12 md:py-16 lg:py-20">
      <div class="container px-4 md:px-6">
        <h1 class="text-3xl font-bold mb-6">Rooms</h1>
        <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div v-for="room in roomsList"
            class="group relative rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-2xl"
            :key="room.room_id">
            <!-- <a class="absolute inset-0 z-10" href="#">
              <span class="sr-only">View meeting room</span>
            </a> -->
            <img
              src="../../public/boardroom.jpg"
              width="400" height="300" alt="Meeting room" style="aspect-ratio: 400 / 300; object-fit: cover"
              class="w-full h-[200px] object-cover group-hover:opacity-80 transition-opacity" />
            <div class="p-4 bg-white dark:bg-gray-900">
              <h3 class="text-lg font-semibold tracking-tight">
                {{ room.room_name }}
              </h3>
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                <span>Capacity: {{ room.capacity }}</span>
                <div data-orientation="vertical" role="none" class="shrink-0 bg-gray-100 w-[1px] h-4">|</div>
                <div v-if="room.isAvailable?.value"
                  class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-lime-500 bg-lime-100 text-lime-500 dark:border-lime-400 dark:bg-lime-900 dark:text-lime-400"
                  data-v0-t="badge">
                  Available
                </div>
                <div v-else
                  class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-red-500 bg-red-100 text-red-500 dark:border-red-400 dark:bg-red-900 dark:text-red-400"
                  data-v0-t="badge">
                  Taken
                </div>
              </div>
              <div class="mt-4 flex ">
                <Modal :room="room" />
                <NuxtLink :to="{ name: 'rooms-id', params: { id: room.room_id } }"
                  class="inline-flex items-center mx-4 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-5 flex-1">
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
import { formatDate, isBefore, isAfter } from 'date-fns';
import { GetRoomStatusDocument, type GetRoomStatusSubscriptionVariables, GetRoomsDocument } from '~/gqlGen/types';

definePageMeta({
  middleware: 'auth' // this should match the name of the file inside the middleware directory 
})

interface rooms {
  room_id: number,
  room_name: string,
  capacity: number,
  isAvailable? : Ref<boolean>
  status? : string
}

const { data, status, error, refresh } = useAsyncQuery(GetRoomsDocument)

const roomsList = computed<rooms[]>(() => {
  return data.value?.rooms.map((room: any) => ({
      ...room,
      isAvailable:ref(true),
    })) ?? []
})
const updateRoomAvailability = (room_id: number, is_available: boolean) => {
  const room = roomsList.value.find(r => r.room_id === room_id);
  if (room) {
    room.isAvailable!.value = is_available;
  }
};
const subscriptionVariables = computed<GetRoomStatusSubscriptionVariables>(() => {
  return {
    room_ids: roomsList.value.map(room => room.room_id),
    date: formatDate(new Date(),'yyyy-MM-dd')
  }
})
const { result } = useSubscription(GetRoomStatusDocument, subscriptionVariables);
watch(result, (newData) => {
  if (newData && newData.rooms && newData.rooms.length > 0) {
    newData.rooms.forEach(room => {
      if (getCurrentMilitaryTime() < room.start_time || getCurrentMilitaryTime() > room.end_time ) {
        updateRoomAvailability(room.room_id, true)
      }else {
        updateRoomAvailability(room.room_id, false)
      }
    })
  } else {

  }
});

onMounted(() => {
  refresh()
})


</script>