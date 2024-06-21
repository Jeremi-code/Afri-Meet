<template>
  <NuxtLayout>
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
            <h1 class="text-3xl font-bold tracking-tight">{{ roomDetail?.room_name }}</h1>
            <p class="text-gray-500 dark:text-gray-400 mt-2">Capacity: {{ roomDetail?.capacity }}</p>
          </div>
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold">Room Details</h2>
            <div class="prose prose-stone">
              <p>
                Our {{ roomDetail?.room_name }} is a spacious and modern meeting space that can accommodate up to 8
                people. It's
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
            <Modal :room="roomDetail " />
            <!-- <button
              class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-11 rounded-md px-8 flex-1 bg-lime-500 hover:bg-lime-600 focus-visible:ring-lime-700">
              Reserve
            </button> -->
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

<script lang="ts" setup>
import { GetRoomByIdDocument } from '~/gqlGen/types';
import { useAsyncQuery } from '#imports';
const route = useRoute()
const { data, status, error, refresh } = useAsyncQuery(GetRoomByIdDocument, {
  id: route.params.id
}
)
interface roomProp {
  room_name: string,
  room_id: number,
  capacity : number
}

const isOpen = ref(false)

const roomDetail = ref<roomProp>({
  room_name : '',
  room_id : 0,
  capacity : 0
})
watchEffect(() => {
  if(data?.value) {
    roomDetail.value = toRaw(data?.value.room[0])
  }
})

</script>

<style scoped></style>