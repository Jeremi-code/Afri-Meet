<template>
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
      <UForm class="space-y-4" :state="meeting" @submit.prevent="onSubmit">
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

        <div class="flex justify-end mt-4">
          <UButton label="Save" type="submit" />
        </div>
      </UForm>
      
      </UCard>
      </UModal>
</template>


<script lang="ts" setup>
import type { ResultOf } from '@graphql-typed-document-node/core';
import { GetUsersDocument, type GetRoomByIdDocument } from '~/gqlGen/types';
import { ref, computed, watchEffect } from 'vue';
import type { FormError, FormSubmitEvent } from '#ui/types'
import z from 'zod';

interface reservationForm {
  title: string;
  room: string;
  date: string;
  start_time: string;
  end_time: string;
  formattedParticipants: string[]
}

type Room = ResultOf<typeof GetRoomByIdDocument>['room'][number];
const props = defineProps<{
  room: Room;
}>();

const selectedRoom = ref(props.room.room_name);
const meeting = ref<reservationForm>({
  title: '',
  room: selectedRoom.value,
  date: '',
  start_time: '',
  end_time: '',
  formattedParticipants: []
});


const errors = ref<string[]>([]);
const today = new Date()
const aMonthAfterToday = new Date()
aMonthAfterToday.setMonth(today.getMonth() + 1)
const meetingForm = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  room: z.string().min(1, { message: "Room selection is required" }),
  date: z.string().transform(str => new Date(str)).refine(date => {
    const currentDate = new Date();
    return date >= currentDate && date <= aMonthAfterToday;
  }, { message: "Date must be within the next month and not in the past" }),
  start_time: z.string().min(1, { message: "Start time is required" }),
  end_time: z.string().min(1, { message: "End time is required" }),
  formattedParticipants: z.array(z.string()).nonempty({ message: "At least one participant is required" })
});

const isOpen = ref(false);

interface Participants {
  first_name: string;
  last_name: string;
  email: string;
}

const participants = ref<Participants[] | null>(null);
const { data } = useAsyncQuery(GetUsersDocument);

watchEffect(() => {
  if (data.value) {
    participants.value = data.value.users;
  }
});

const onSubmit = () => {
  console.log(meeting.value.room, meeting.value.formattedParticipants)
  console.log('baksh')
  console.log(meeting.value.title)
  console.log(meeting.value.start_time, 'ermi')
  const validateForm = meetingForm.safeParse(meeting.value);
  if (!validateForm.success) {
    console.log(validateForm.error)
    errors.value = validateForm.error.errors.map((err) => err.message);
    return;
  }
  errors.value = [];
  const data = validateForm.data;
  console.log(data);
  // Submit form data
};

const rooms = ['Conference Room A', 'Boardroom', 'Executive Suite', 'Huddle Room'];

const formattedParticipants = computed(() =>
  participants.value ? participants.value.map((p) => ({
    label: `${p.first_name} ${p.last_name} (${p.email})`,
    value: p,
  })) : []
);
</script>
