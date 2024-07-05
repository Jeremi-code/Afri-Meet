<template>
  <div>
    <UButton
      class="px-12 text-white inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-9 rounded-md  "
      label="Reserve" @click="isOpen = true" />
    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Reserve {{ room.room_name }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpen = false" />
          </div>
        </template>

        <UForm class="space-y-4" :schema="meetingForm" :state="meeting" @submit="onSubmit" @error="onError">
          <UFormGroup label="Meeting Title" name="title">
            <UInput v-model="meeting.title" id="title" />
          </UFormGroup>

          <UFormGroup label="Room" name="room">
            <UInputMenu v-model="meeting.room" :options="rooms" placeholder="Select a room" id="room" />
          </UFormGroup>

          <UFormGroup label="Date" name="date">
            <UInput type="date" id="date" v-model="meeting.date" />
          </UFormGroup>

          <UFormGroup label="Start Time" name="start_time">
            <UInput id="startTime" type="time" v-model="meeting.start_time" />
          </UFormGroup>

          <UFormGroup label="End Time" name="end_time">
            <UInput id="endTime" type="time" v-model="meeting.end_time" />
          </UFormGroup>

          <UFormGroup label="Participants" name="formattedParticipants">
            <USelectMenu v-if="participants !== null" v-model="meeting.formattedParticipants" multiple
              :options="formattedParticipants" id="participants">
              <template #leading>
                <UIcon name="i-heroicons-user-group-20-solid" class="mr-2" />
              </template>
              <template #empty>
                None Selected
              </template>

            </USelectMenu>
          </UFormGroup>

          <!-- Toggle for adding external participants -->
          <UFormGroup label="Add External Participants">
            <UToggle v-model="addExternalParticipants" />
          </UFormGroup>

          <UFormGroup v-if="addExternalParticipants" label="External Participant Names">
            <div class="flex flex-wrap gap-2">
              <div v-for="(name, index) in meeting.externalParticipants" :key="index" class="relative">
                <span class="bg-gray-200 rounded-md py-1 px-2 flex items-center">
                  {{ name }}
                  <button type="button" @click="removeExternalParticipant(index)"
                    class="ml-2 text-gray-400 hover:text-gray-600">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
            <div class="flex items-center mt-2">
              <UInput v-model="newExternalParticipant" placeholder="Add a name" />
              <UButton class="ml-2" label="Add" @click="addExternalParticipant" />
            </div>
          </UFormGroup>
          <div class="flex justify-end mt-4">
            <UButton label="Save" type="submit"  />
          </div>
        </UForm>
      </UCard>
      <div v-if="loading" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-1200">
        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
          <span class="spinner"></span>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { FormErrorEvent} from '#ui/types'
import type { ResultOf } from '@graphql-typed-document-node/core';
import { GetUsersDocument, GetRoomByIdDocument, GetRoomsByNameDocument, AddExternalParticipantDocument, AddMeetingDocument, AddParticipantDocument, SendEmailDocument, GetMeetingIdDocument, GetBookedParticipantsDocument, GetRoomByMeetingIdDocument } from '~/gqlGen/types';
import { ref, computed } from 'vue';
import z from 'zod';
import {  isValid, addMonths, parse, startOfDay,formatDate } from 'date-fns';

interface ReservationForm {
  title: string;
  room: string;
  date: string;
  start_time: string;
  end_time: string;
  formattedParticipants: Array<{ label: string, value: string }>;
  externalParticipants: string[];
}

type Room = ResultOf<typeof GetRoomByIdDocument>['room'][number];
const props = defineProps<{
  room: Room;
}>();

const onError = (event: FormErrorEvent) => {
  console.log("error", event)
}

const selectedRoom = ref(props.room.room_name);
const meeting = ref<ReservationForm>({
  title: '',
  room: selectedRoom.value,
  date: '',
  start_time: '',
  end_time: '',
  formattedParticipants: [],
  externalParticipants: []
});

const parseDate = (dateStr: string) => {
  return startOfDay(parse(dateStr, 'yyyy-MM-dd', new Date()));
};


const startOfDayToday = startOfDay(new Date())
const startOfDayInAMonth = addMonths(startOfDayToday, 1)

const meetingForm = z.object({
  title: z.string().min(1, 'Title is required'),
  room: z.string().min(1, 'Room is required'),
  date: z.string()
    .date()
    .transform(str => parseDate(str))
    .pipe(z.date().min(startOfDayToday, 'Start Date cannot be in the past').max(startOfDayInAMonth, 'Cannot schedule meetings more than a month in advance')),
  start_time: z.string().refine(val => isValid(parse(val, 'HH:mm', new Date())), 'Start Time is Required'),
  end_time: z.string().refine(val => isValid(parse(val, 'HH:mm', new Date())), 'End Time is required'),
  formattedParticipants: z.array(z.object({
    value : z.string(),
    label : z.string().optional()
  }
  )).min(1,'At least one participant is needed'),
  externalParticipants: z.array(z.string().min(1)).optional(),
})

const newExternalParticipant = ref('');
const isOpen = ref(false);
const addExternalParticipants = ref(false);
const loading = ref(false)

const { data: usersData } = useAsyncQuery(GetUsersDocument)

const { data: roomData } = useAsyncQuery(GetRoomsByNameDocument, {
  name: meeting.value.room
})

const participants = computed(() => usersData.value?.users)
const room_id = computed(() => roomData.value?.room[0].room_id)
const capacity = computed(() => roomData.value?.room[0].capacity)
const authStore = useAuthStore()

const addMeeting = async () => {
  const { mutate, loading, error } = useMutation(AddMeetingDocument)
  const result = await mutate({
    input: {
      title: meeting.value.title,
      room_id: room_id.value,
      date: meeting.value.date,
      creator: authStore.user_id,
      start_time: meeting.value.start_time,
      end_time: meeting.value.end_time
    }
  })
  return result
}
const addParticipant = async (meeting_id: number | undefined, email: string) => {
  const { mutate } = useMutation(AddParticipantDocument)
  const result = await mutate({
    input: {
      meeting_id: meeting_id,
      email: email
    }
  })
  return result
}
const sendMeetingEmail = async (title: string, to: string, date: string, start_time: string, end_time: string) => {
  const { mutate } = useMutation(SendEmailDocument)
  const result = await mutate({
    input: {
      title,
      to,
      date,
      start_time,
      end_time
    }
  })
  return result
}
const mutateExternalParticipants = async (meeting_id: number | undefined) => {
  const { mutate } = useMutation(AddExternalParticipantDocument)
  const meetingObject = meeting.value.externalParticipants.map((meet) => {
    return {
      name: meet,
      meeting_id: meeting_id
    }
  })
  const result = await mutate({
    input: meetingObject,

  })
  return result
}

const clearForm = () => {
  meeting.value.date = ''
  meeting.value.title = ''
  meeting.value.start_time = ''
  meeting.value.end_time = ''
  meeting.value.externalParticipants = []
  meeting.value.formattedParticipants = []
}
const customToaster = useCustomToast()

const onSubmit = async () => {
  const { data: meetingData,refresh:refetchReservedMeetings } = useAsyncQuery(GetMeetingIdDocument, {
  date: meeting.value.date,
  startTime: meeting.value.start_time,
  endTime: meeting.value.end_time
})
  const reservedMeetings = computed(() => meetingData.value?.meeting ?? [])
  const currentTime = getCurrentMilitaryTime().split(':')
  const currentDate = formatDate(new Date(),'yyyy-MM-dd')
  const normalizedStartedTime = meeting.value.start_time.split(':')
  const normalizedEndTime = meeting.value.end_time.split(':')
  if (normalizedEndTime[0] <= normalizedStartedTime[0]) {
    if ((parseInt(normalizedEndTime[1]) - parseInt(normalizedStartedTime[1]) < 10) || (parseInt(normalizedEndTime[0]) < parseInt(normalizedStartedTime[0]))) {
      customToaster.add('end time and start time must have at least a 10 min difference',"error")
      return
    }
  } if (meeting.value.date == currentDate && (currentTime[0] > normalizedStartedTime[0] || (currentTime[0] == normalizedStartedTime[0] && currentTime[1] > normalizedStartedTime[1]))) {
    customToaster.add('Time has already passed','error')
    return
  }
  if (capacity.value! < toRaw(meeting.value.formattedParticipants.length) + toRaw(meeting.value.externalParticipants.length)) {
    customToaster.add('Room does not have the capacity for this meeting','error')
    return
  }
  if (reservedMeetings.value) {
    const reservedRoomList = reservedMeetings.value!.map((meeting) => {
      return meeting.meetingroom.room_id
    })
    const reservedParticipantsList = reservedMeetings.value!.flatMap((meeting) => {
      return meeting.participants.map((participant) => {
        return participant.email
      })
    })
    if (toRaw(reservedRoomList.includes(room_id.value!))) {
      customToaster.add('The Room is reserved at this time','error')
      return;
    }
    if (reservedParticipantsList) {
      const meetings = meeting.value.formattedParticipants;
      for (const meet of meetings) {
        if (reservedParticipantsList.includes(meet.value)) {
          customToaster.add('Person who is invivted to a meeting at the time is included','error')
          return;
        }
      }
    }
  }
  return
  try {
    loading.value = true
    const meetingResult = await addMeeting()
    const meetingID = meetingResult?.data?.meeting?.meeting_id
    const meetings = toRaw(meeting.value.formattedParticipants);
    meetings.forEach(async (meet) => {
      await addParticipant(meetingID, meet.value)
      await sendMeetingEmail(meeting.value.title, meet.value, meeting.value.date, meeting.value.start_time, meeting.value.end_time)
    })
    await mutateExternalParticipants(meetingID)
    clearForm()
    customToaster.add('meeting added successfully','ok')
  } catch (error: any) {
    console.log(error.toString())
    customToaster.add('error on adding a meeting','error')
  } finally {
    loading.value = false
    isOpen.value = false
  }
}



const rooms = ['Conference Room A', 'Boardroom', 'Executive Suite', 'Huddle Room'];

const formattedParticipants = computed(() =>
  participants.value ? participants.value.map((p) => ({
    label: `${p.first_name} ${p.last_name} (${p.email})`,
    value: p.email,
  })) : []
);

const addExternalParticipant = () => {
  if (newExternalParticipant.value) {
    meeting.value.externalParticipants.push(newExternalParticipant.value);
    newExternalParticipant.value = '';
  }
};

const removeExternalParticipant = (index: number) => {
  meeting.value.externalParticipants.splice(index, 1);
};

</script>
<style scoped>
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left-color: #ffffff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>