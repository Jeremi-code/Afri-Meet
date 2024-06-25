<template>
  <div>
    <UButton
      class="text-white inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 flex-1"
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

        <UForm class="space-y-4" :schema="meetingForm" :state="meeting" @submit.prevent="onSubmit">
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

          <UFormGroup label="Participants" name="participants">
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
            <UButton label="Save" type="submit" @click="onSubmit" />
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { ResultOf } from '@graphql-typed-document-node/core';
import { GetUsersDocument, GetRoomByIdDocument, GetRoomsByNameDocument, AddExternalParticipantDocument, AddMeetingDocument, AddParticipantDocument } from '~/gqlGen/types';
import { ref, computed, watchEffect } from 'vue';
import z from 'zod';
import { isBefore, isValid, isAfter, addMonths, parse, startOfDay, addDays, addMinutes } from 'date-fns';
import authStore from '~/store/authStore';
import type { RefSymbol } from '@vue/reactivity';

interface ReservationForm {
  title: string;
  room: string;
  date: string;
  start_time: string;
  end_time: string;
  formattedParticipants: string[];
  externalParticipants: string[];
}

type Room = ResultOf<typeof GetRoomByIdDocument>['room'][number];
const props = defineProps<{
  room: Room;
}>();

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
  formattedParticipants: z.array(z.string().min(1)).optional(),
  externalParticipants: z.array(z.string().min(1)).optional(),
})

const newExternalParticipant = ref('');
const isOpen = ref(false);
const addExternalParticipants = ref(false);


interface Participants {
  first_name: string;
  last_name: string;
  email: string;
}
const toast = useToast()
const participants = ref<Participants[] | null>(null);
const selectedParticipants = ref<Participants[] | null>(null)
const capacity = ref(props.room.capacity)
const room_id = ref(props.room.room_id)

const getUsers = () => {
  const { data } = useAsyncQuery(GetUsersDocument)
  return data
}

const getCapacity = () => {
  const { data, status, error, refresh } = useAsyncQuery(GetRoomsByNameDocument, {
    name: meeting.value.room
  })

  return data
}

const storeAuth = authStore()

const addMeeting = async () => {
  const { mutate, loading, error } = useMutation(AddMeetingDocument)
  console.log(storeAuth.user_id)
  const result = await mutate({
    input: {
      title: meeting.value.title,
      room_id: room_id.value,
      date: meeting.value.date,
      creator: storeAuth.user_id,
      start_time: meeting.value.start_time,
      end_time: meeting.value.end_time
    }
  })
  return result
}
const addParticipant = async (meeting_id: number | undefined, email: string) => {
  const { mutate, loading, error } = useMutation(AddParticipantDocument)
  const result = await mutate({
    input: {
      meeting_id: meeting_id,
      email: email
    }
  })
  return result
}

const mutateExternalParticipants = async (meeting_id: number | undefined) => {
  const { mutate, loading, error } = useMutation(AddExternalParticipantDocument)
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
watchEffect(() => {
  const usersData = getUsers()
  if (usersData.value) {
    participants.value = usersData.value.users;
  }
  const roomData = getCapacity()
  if (roomData.value) {
    capacity.value = roomData.value.room[0].capacity
    room_id.value = roomData.value.room[0].room_id
  }
});

const onSubmit = async () => {
  const meetingss = meeting.value.formattedParticipants
  meetingss.forEach((meeting) => {
    
  })
  const normalizedStartedTime = meeting.value.start_time.split(':')
  const normalizedEndTime = meeting.value.end_time.split(':')
  if (normalizedEndTime[0] <= normalizedStartedTime[0]) {
    if ((parseInt(normalizedEndTime[1]) - parseInt(normalizedStartedTime[1]) < 10) || (parseInt(normalizedEndTime[0]) < parseInt(normalizedStartedTime[0]))) {
      toast.add({
        title: 'end time and start time must have at least a 10 min difference',
        color: 'red',
        icon: "i-heroicons-x-mark",
        ui: {
          backgroundColor: "bg-red-100"

        }
      });
      return
    }
  }
  if (capacity.value < toRaw(meeting.value.formattedParticipants.length)) {
    toast.add({
      title: 'Room does not have the capacity for this meeting',
      color: 'red',
      icon: "i-heroicons-x-mark",
      ui: {
        backgroundColor: "bg-red-100"

      }
    });
  }
  const meetingResult = await addMeeting()
  console.log(meetingResult)
  const meetingID = meetingResult?.data?.meeting?.meeting_id
  participants.value?.forEach(async (participant) => {
    await addParticipant(meetingID,participant.email)
  })
  
  // await addParticipant(meetingID, participant)
  await mutateExternalParticipants(meetingID)

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
