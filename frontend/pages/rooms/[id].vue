<template>
    <div class="max-w-6xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="relative rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-2xl">
          <img src="c:\Users\Jeremiah\Downloads\boardroom.jpg" width="800" height="600" alt="Meeting room"
            class="w-full h-[550px] object-cover group-hover:opacity-80 transition-opacity"
            style="aspect-ratio: 800 / 600; " />
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
            <Modal :room="roomDetail" />
          </div>
        </div>
      </div>
      <div class="mt-12">
        <h2 class="text-2xl font-semibold mb-4">Upcoming Meetings</h2>
        <div class="grid gap-4">
          <div v-if="meetings.length === 0" class="text-gray-500 dark:text-gray-400">
            No upcoming meetings in this room.
          </div>
          <div v-else>
            <div v-for="meeting in meetings" :key="meeting.meeting_id"
              class="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-5 flex items-center justify-between">
              <div>
                <div class="flex items-center space-x-2">
                  <h3 class="text-lg font-semibold">{{ meeting.title }}</h3>
                  <div
                  class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-200 dark:bg-green-700 text-green-500 dark:text-green-400"
                  data-v0-t="badge">
                  <p>{{ meeting.date }}</p>
                </div>
                </div>
                <p class="text-gray-500 dark:text-gray-400"> {{  meeting.start_time }} - {{ meeting.end_time }}</p>
              </div>
              <div v-if="getCurrentMilitaryTime() > meeting.start_time && currentDate == meeting.date" class="flex items-center gap-2">
                <div
                  class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-200 dark:bg-green-700 text-green-500 dark:text-green-400"
                  data-v0-t="badge">
                  Ongoing
                </div>
              </div>
              <div v-else class="flex items-center gap-2">
                <div
                  class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  data-v0-t="badge">
                  Later
                </div>
              </div>
            </div>
            <!-- You can add badges or other indicators based on meeting status or conditions -->
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { GetRoomByIdDocument, GetUpcomingMeetingsDocument } from '~/gqlGen/types';
import { useAsyncQuery } from '#imports';
import { formatDate } from 'date-fns';
const route = useRoute()

interface roomProp {
  room_name: string,
  room_id: number,
  capacity: number
}

interface Meeting {
  title?: string | null,
  room_id: number,
  date:string,
  meeting_id: number,
  creator: number,
  start_time: string,
  end_time: string
}




const isOpen = ref(false)

const { data: roomData, status, error, refresh } = useAsyncQuery(GetRoomByIdDocument, {
  id: route.params.id
}
)
const currentDate = computed(() => formatDate(new Date(),'yyyy-MM-dd'))
const { result: meetingsData, loading: meetingsStatus, error: meetingsError, refetch: refreshMeetings } = useQuery(GetUpcomingMeetingsDocument, {
  room_id: parseInt(route.params.id as string),
  current_time: getCurrentMilitaryTime(),
  date:currentDate
},
{
  fetchPolicy : 'no-cache'
}
);
const meetings = ref<Meeting[]>([]);

const roomDetail = ref<roomProp>({
  room_name: '',
  room_id: 0,
  capacity: 0
})
watchEffect(() => {
  if (roomData?.value) {
    roomDetail.value = toRaw(roomData?.value.room[0])
  }
  if (meetingsData?.value) {
    meetings.value = meetingsData.value.meetings.map((meeting: any) => ({
      meeting_id: meeting.meeting_id,
      title: meeting.title,
      room_id: meeting.room_id,
      date: meeting.date,
      creator: meeting.creator,
      start_time: meeting.start_time,
      end_time: meeting.end_time
    }));
  }
  console.log(meetingsData.value,'nullis')
})

</script>

<style scoped></style>