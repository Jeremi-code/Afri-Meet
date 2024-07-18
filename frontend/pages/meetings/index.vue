<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-6">Meetings</h1>
    <div v-if="loading" class="flex items-center justify-center h-96">
      <svg class="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2zm2 8a8 8 0 018-8h2a10 10 0 00-10 10v-2z"></path>
      </svg>
    </div>
    <div v-else-if="meetingError" class="text-red-500">
      {{ meetingError }}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      v-else-if="meetingData?.createdMeetings === undefined || meetingData.joinedMeetings === undefined || (!meetingData?.createdMeetings?.length && !meetingData?.joinedMeetings?.length)">
      <div class="col-span-full text-center">
        <p class="text-lg text-muted-foreground">No meetings found</p>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" v-else>
      <div class="rounded-lg shadow-md p-4 md:p-6 space-y-4" v-for="createdMeeting in createdMeetingsList">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">{{ createdMeeting.title }}</h2>
          <div class="flex items-center gap-2 lsm:flex-col">
            <RescheduleModal :room="createdMeeting.room" :participants="createdMeeting.participants"
              :start_time="createdMeeting.start_time" :end_time="createdMeeting.end_time" :date="createdMeeting.date"
              :external_participants="createdMeeting.external_participants" :meeting_id="createdMeeting.meeting_id"
              :title="createdMeeting.title" @update-meeting="refreshPage" />
            <!-- <button @click="deleteMeeting(createdMeeting.meeting_id)"
              class="bg-red-500 text-white hover:bg-red-600 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3">
              Cancel
            </button> -->
            <CancelModal @confirm="deleteMeeting(createdMeeting.meeting_id)" />
          </div>
        </div>
        <div
          class="flex items-center justify-between text-sm text-muted-foreground lsm:flex-col lsm:items-baseline lsm:justify-between">
          <p class="lsm:mb-4"><span class="font-semibold text-md">Date:</span> {{ createdMeeting.date }}</p>
          <p><span class="font-semibold text-md">Time:</span>{{ createdMeeting.start_time }} - {{
            createdMeeting.end_time }}</p>
        </div>
        <p class="text-sm text-muted-foreground"><span class="font-semibold text-md">Room:</span>
          {{ createdMeeting.room.room_name }}</p>
        <p class="text-md font-semibold mb-2">Participants: {{ createdMeeting.participants.length }}</p>
        <div class="flex items-center gap-2 flex-wrap max-h-20 overflow-auto">
          <div v-for="participant in createdMeeting.participants" class="flex items-center gap-2">
            <span class="relative flex size-10 shrink-0 overflow-auto rounded-full">
              <img class="aspect-square size-full" alt="John Doe" src="../../public/placeholder-user.jpg" />
            </span>
            <span class="text-sm">{{ participant.name }}</span>
          </div>
        </div>
        <div>
          <p class="text-md font-semibold mb-2">External Participants: {{ createdMeeting.external_participants.length
            }}</p>
          <div class="flex items-center gap-2 flex-wrap max-h-20 overflow-auto">
            <div v-for="externalParticipant in createdMeeting.external_participants" class="flex items
          -center gap-2">
              <span class="relative flex size-10 shrink-0 overflow-auto rounded-full">
                <img class="aspect-square h-full w-full" alt="Emily Davis" src="../../public/placeholder-user.jpg" />
              </span>
              <span class="text-sm">{{ externalParticipant.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-for="meeting in joinedMeetingsList" class="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-4">
        <h2 class="text-xl  font-semibold">{{ meeting.title }}</h2>
        <div class="flex items-center justify-between text-sm text-muted-foreground">
          <p><span class="font-semibold text-md">Date:</span> {{ meeting.date }}</p>
          <p><span class="font-semibold text-md">Time:</span>{{ meeting.start_time }} - {{ meeting.end_time }}</p>
        </div>
        <p class="text-sm text-muted-foreground"><span class="font-semibold text-md">Room:</span>{{
          meeting.room.room_name }}</p>
        <div class="space-y-2">
          <p class="text-md font-semibold">Participants: {{ meeting.participants.length }}</p>
          <div class="flex items-center gap-2 flex-wrap max-h-20 overflow-auto">
            <div v-for="participant in meeting.participants" class="flex items-center gap-2">
              <span class="relative flex size-10 shrink-0 overflow-hidden rounded-full">
                <img class="aspect-square size-full" alt="John Doe" src="../../public/placeholder-user.jpg" />
              </span>
              <span class="text-sm">{{ participant.name }}</span>
            </div>
          </div>
        </div>
        <div>
          <p class="text-md font-semibold mb-2">External Participants: {{ meeting.external_participants.length }}</p>
          <div class="flex items-center gap-2 flex-wrap max-h-20 overflow-hidden">
            <div v-for="externalParticipant in meeting.external_participants" class="flex items-center gap-2">
              <span class="relative flex size-10 shrink-0 overflow-hidden rounded-full">
                <img class="aspect-square size-full" alt="Emily Davis" src="../../public/placeholder-user.jpg" />
              </span>
              <span class="text-sm">{{ externalParticipant.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { formatDate } from 'date-fns';
import RescheduleModal from '~/components/RescheduleModal.vue';
import { DeleteMeetingDocument, GetMeetingsForUserDocument, GetRoomsDocument, GetUsersDocument } from '~/gqlGen/types';

definePageMeta({
  middleware: 'auth'
})

interface Participant {
  email: string;
  name: string;
}

interface ExternalParticipant {
  name: string;
}

interface Meeting {
  __typename?: string;
  meeting_id: number;
  title?: string | null;
  date: string;
  room_id: number;
  creator: number;
  start_time: string;
  end_time: string;
  participants: Participant[];
  external_participants: ExternalParticipant[];
  room: Room;
}

interface Room {
  room_name: string,
  room_id: number,
  capacity: number
}

interface User {
  user_id: number,
  email: string,
  first_name: string,
  last_name: string,
}

interface Users {
  email: string,
  first_name: string,
  last_name: string,
}

const authStore = useAuthStore()
const { user_email, user_id } = storeToRefs(authStore)
const currentDate = computed(() => formatDate(new Date(), 'yyyy-MM-dd'))
const user = ref<User>({ user_id: user_id.value!, email: user_email.value!, first_name: "", last_name: "" })

const { data: roomData, status: roomStatus, error: roomError, refresh: refreshRoom, } = await useAsyncQuery(GetRoomsDocument)
const roomsList = computed<Room[]>(() => {
  return roomData.value?.rooms ?? []
})
const { result: meetingData, loading, error: meetingError, refetch: refreshMeetings } = useQuery(GetMeetingsForUserDocument, {
  user_id: user.value.user_id,
  email: user.value.email,
  date: currentDate.value
},
  {
    fetchPolicy: 'no-cache'
  }
);
const { data: usersData, status: usersStatus, error: usersError, refresh: refreshUsers } = await useAsyncQuery(GetUsersDocument)

const { mutate } = useMutation(DeleteMeetingDocument)
const deleteMeeting = async (meeting_id: number) => {
  await mutate({
    meeting_id
  })
  await refreshMeetings()
}

const usersList = computed<Users[]>(() => {
  return usersData.value?.users ?? []
})

const createdMeetingsList = computed<Meeting[]>(() => {
  return meetingData.value?.createdMeetings.map((meeting: any) => {
    let room = roomsList.value.find((room) => room.room_id === meeting.room_id)
    return ({
      ...meeting,
      room,
      date: meeting.date as string,
      participants: meeting.participants.map((participant: any) => {
        let participantUser = usersList.value.find((user) => user.email === participant.email)
        return {
          email: participant.email,
          name: participantUser ? participantUser.first_name + " " + participantUser.last_name : participant.email
        }
      })
    })
  }) ?? []
})

const createdMeetingIds = computed(() => createdMeetingsList.value.map(meeting => meeting.meeting_id))

const joinedMeetingsList = computed<Meeting[]>(() => {
  return meetingData.value?.joinedMeetings.filter((meeting: any) => {
    return !createdMeetingIds.value.includes(meeting.meeting_id)
  }).map((meeting: any) => {
    let room = roomsList.value.find((room) => room.room_id === meeting.room_id)
    return ({
      ...meeting,
      room,
      date: meeting.date as string,
      participants: meeting.participants.map((participant: any) => {
        let participantUser = usersList.value.find((user) => user.email === participant.email)
        return {
          email: participant.email,
          name: participantUser ? participantUser.first_name + " " + participantUser.last_name : participant.email
        }
      })
    })
  }) ?? []
})
const refreshPage = async () => {
  await refreshMeetings()
}
async function refetchData() {
  loading.value = true
  await refreshMeetings()
  await refreshRoom()
  await refreshUsers()

  loading.value = false
}

onMounted(() => {
  refetchData()
})

</script>