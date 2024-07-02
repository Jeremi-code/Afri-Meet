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
    <div v-else-if="meetingStatus === 'error'" class="text-red-500">
      {{ meetingError }}
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div
        v-if="meetingData?.createdMeetings === undefined || meetingData.joinedMeetings === undefined || (!meetingData?.createdMeetings?.length && !meetingData?.joinedMeetings?.length)"
        class="col-span-full text-center">
        <p class="text-lg text-muted-foreground">No meetings found</p>
      </div>
      <template v-else>
        <div class="rounded-lg shadow-md p-4 md:p-6 space-y-4" v-for="createdMeeting in meetingData.createdMeetings">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">{{ createdMeeting.title }}</h2>
            <div class="flex items-center gap-2">
              <button
                class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                Reschedule
              </button>
              <button
                class="bg-red-500 text-white hover:bg-red-600 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3">
                Cancel
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between text-sm text-muted-foreground">
            <p><span class="font-semibold text-md">Date:</span> {{createdMeeting.date }}</p>
            <p><span class="font-semibold text-md">Time:</span>{{ createdMeeting.start_time }} - {{ createdMeeting.end_time }}</p>
          </div>
          <p class="text-sm text-muted-foreground"><span class="font-semibold text-md">Room:</span>
            {{ createdMeeting.meetingroom.room_name }}</p>
          <p class="text-md font-semibold mb-2">Participants: {{ createdMeeting.participants.length }}</p>
          <div class="flex items-center gap-2 flex-wrap max-h-20 overflow-hidden">
            <div v-for="participant in createdMeeting.participants" class="flex items-center gap-2">
              <span class="relative flex size-10 shrink-0 overflow-hidden rounded-full">
                <img class="aspect-square size-full" alt="John Doe" src="../../public/placeholder-user.jpg" />
              </span>
              <span class="text-sm">{{ participant.email }}</span>
            </div>
          </div>
          <!-- <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 mt-2">
            Show all
          </button> -->
          <!-- <p class=" mt-2">{{createdMeeting.participants.length}} participants</p> -->
          <div>
            <p class="text-md font-semibold mb-2">External Participants: {{ createdMeeting.external_participants.length
              }}</p>
            <div class="flex items-center gap-2 flex-wrap max-h-20 overflow-hidden">
              <div v-for="externalParticipant in createdMeeting.external_participants" class="flex items
            -center gap-2">
                <span class="relative flex size-10 shrink-0 overflow-hidden rounded-full">
                  <img class="aspect-square h-full w-full" alt="Emily Davis" src="../../public/placeholder-user.jpg" />
                </span>
                <span class="text-sm">{{ externalParticipant.name }}</span>
              </div>
            </div>
            <!-- <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 mt-2">
            Show all
          </button> -->
            <!-- <p class="text-sm text-muted-foreground mt-2">2 external participants</p> -->
          </div>
        </div>
        <div v-for="meeting in meetingData.joinedMeetings" class="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-4">
        <h2 class="text-xl text-center font-semibold">{{ meeting.title }}</h2>
        <div class="flex items-center justify-between text-sm text-muted-foreground">
          <p><span class="font-semibold text-md">Date:</span> {{ meeting.date }}</p>
          <p><span class="font-semibold text-md">Time:</span>{{ meeting.start_time }} - {{ meeting.end_time }}</p>
        </div>
        <p class="text-sm text-muted-foreground"><span class="font-semibold text-md">Room:</span>{{ meeting.meetingroom.room_name }}</p>
        <div class="space-y-2">
          <p class="text-md font-semibold">Participants: {{ meeting.participants.length }}</p>
          <div class="flex items-center gap-2 flex-wrap max-h-20 overflow-hidden">
            <div v-for="participant in meeting.participants" class="flex items-center gap-2">
              <span class="relative flex size-10 shrink-0 overflow-hidden rounded-full">
                <img class="aspect-square size-full" alt="John Doe" src="../../public/placeholder-user.jpg" />
              </span>
              <span class="text-sm">{{ participant.email }}</span>
            </div>
          </div>
          <!-- <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 mt-2">
            Show all
          </button> -->
          <!-- <p class="text-sm text-muted-foreground mt-2">{{meeting.participants.length}} participants</p> -->
        </div>
        <div class="">
          <p class="text-md font-semibold mb-2">External Participants: {{ meeting.external_participants.length }}</p>
          <div class="flex items-center gap-2 flex-wrap max-h-20 overflow-hidden">
            <div v-for="externalParticipant in meeting.external_participants" class="flex items-center gap-2">
              <span class="relative flex size-10 shrink-0 overflow-hidden rounded-full">
                <img class="aspect-square size-full" alt="Emily Davis" src="../../public/placeholder-user.jpg" />
              </span>
              <span class="text-sm">{{ externalParticipant.name }}</span>
            </div>
          </div>
          <!-- <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 mt-2">
          Show all
        </button> -->
          <!-- <p class="text-sm text-muted-foreground mt-2">2 external participants</p> -->
        </div>
      </div>
      </template>
    </div>

  </div>
</template>
<script setup lang="ts">
import { GetMeetingsForUserDocument, GetRoomsDocument, GetUsersDocument } from '~/gqlGen/types';

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
const loading = ref(true)

const authStore = useAuthStore()
const { user_email, user_id } = storeToRefs(authStore)
const user = ref<User>({ user_id: user_id.value!, email: user_email.value!, first_name: "", last_name: "" })

const roomsList = ref<Room[]>([])
const { data: roomData, status: roomStatus, error: roomError, refresh: refreshRoom } = useAsyncQuery(GetRoomsDocument)

const createdMeetingsList = ref<Meeting[]>([])

const { data: meetingData, status: meetingStatus, error: meetingError, refresh: refreshMeetings } = useAsyncQuery(GetMeetingsForUserDocument, {
  user_id: user.value.user_id,
  email: user.value.email,
})


const { data: createdMeetingData, status: createdMeetingStatus, error: createdMeetingError, refresh: refreshCreatedMeeting } = useAsyncQuery(GetMeetingsForUserDocument, {
  user_id: user.value.user_id,
  email: user.value.email,
})

const joinedMeetingsList = ref<Meeting[]>([])
const { data: joinedMeetingData, status: joinedMeetingStatus, error: joinedMeetingError, refresh: refreshJoinedMeeting } = useAsyncQuery(GetMeetingsForUserDocument, {
  user_id: user.value.user_id,
  email: user.value.email,
})

const usersList = ref<Users[]>([])
const { data: usersData, status: usersStatus, error: usersError, refresh: refreshUsers } = useAsyncQuery(GetUsersDocument)

watchEffect(() => {
  if (roomData.value) {
    roomsList.value = toRaw(roomData.value?.rooms)
  }

  if (usersData.value) {
    usersList.value = toRaw(usersData.value?.users)
  }

  if (createdMeetingData.value) {
    createdMeetingsList.value = toRaw(createdMeetingData.value?.createdMeetings).map((meeting: any) => {
      console.log(createdMeetingData.value)
      let room = roomsList.value.find((room) => room.room_id === meeting.room_id)
      return ({
        ...meeting,
        room,
        date: meeting.date as string,  // Cast date to string
        participants: meeting.participants.map((participant: any) => {
          let participantUser = usersList.value.find((user) => user.email === participant.email)
          console.log(participantUser)
          return {
            email: participant.email,
            name: participantUser ? participantUser.first_name + " " + participantUser.last_name : participant.email
          }
        })
      })
    });
  }

  if (joinedMeetingData.value) {
    joinedMeetingsList.value = toRaw(joinedMeetingData.value?.joinedMeetings).map((meeting: any) => {
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
    });
  }
})

onMounted(async () => {
  loading.value = true
  await refreshRoom()
  await refreshUsers()
  await refreshCreatedMeeting()
  await refreshJoinedMeeting()

  loading.value = false
})

</script>