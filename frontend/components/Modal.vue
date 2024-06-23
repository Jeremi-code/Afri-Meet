<template>
  <div>
    <UButton
      class="text-white inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 flex-1"
      label="Reserve"
      @click="isOpen = true"
    />
    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Reserve {{ room.room_name }}
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <UForm
          class="space-y-4"
          :schema="meetingForm"
          :state="meeting"
          @submit.prevent="onSubmit"
        >
          <UFormGroup label="Meeting Title" name="title">
            <UInput v-model="meeting.title" id="title" />
          </UFormGroup>

          <UFormGroup label="Room" name="room">
            <UInputMenu
              v-model="meeting.room"
              :options="rooms"
              placeholder="Select a room"
              id="room"
            />
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
            <USelectMenu
              v-if="participants !== null"
              v-model="meeting.formattedParticipants"
              multiple
              :options="formattedParticipants"
              id="participants"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-user-group-20-solid"
                  class="mr-2"
                />
              </template>
              <template #empty>
                None Selected
              </template>
            </USelectMenu>
          </UFormGroup>

          <!-- Toggle for adding external participant -->
          <UFormGroup label="Add External Participant">
            <UToggle v-model="addExternalParticipant" />
          </UFormGroup>

          <!-- Conditional input field for external participant email -->
          <UFormGroup v-if="addExternalParticipant" label="External Participant Email">
            <UInput v-model="externalParticipantEmail" type="email" />
          </UFormGroup>

          <div class="flex justify-end mt-4">
            <UButton label="Save" type="submit" />
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { ResultOf } from '@graphql-typed-document-node/core';
import { GetUsersDocument, type GetRoomByIdDocument } from '~/gqlGen/types';
import { ref, computed, watchEffect } from 'vue';
import z from 'zod';
import { isBefore, isValid, isAfter, addMonths, parse, startOfDay, addDays, addMinutes } from 'date-fns';

interface reservationForm {
  title: string;
  room: string;
  date: string;
  start_time: string;
  end_time: string;
  formattedParticipants: string[];
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

const parseDate = (dateStr: string) => {
  return startOfDay(parse(dateStr, 'yyyy-MM-dd', new Date()));
};

const isValidDate = (dateStr: string) => {
  const date = parseDate(dateStr);
  return isValid(date);
};

const parseTime = (timeStr: string): Date => {
  return parse(timeStr, 'h:mm a', new Date());
};

const isDateWithinNextMonth = (dateStr: string): boolean => {
  const date = parseDate(dateStr);
  const today = startOfDay(new Date());
  const nextMonth = startOfDay(addMonths(today, 1));

  const datePlusOneDay = addDays(date, 1);

  const isAfterToday = isAfter(datePlusOneDay, today);
  const isBeforeNextMonth = isBefore(date, nextMonth);

  return isAfterToday && isBeforeNextMonth;
};

// Zod schema for form validation
const meetingForm = z.object({
  title: z.string().min(1, 'Title is required'),
  room: z.string().min(1, 'Room is required'),
  date: z.string()
    .refine(isValidDate, { message: 'Invalid date format' })
    .refine(isDateWithinNextMonth, { message: 'Date must be within the next month and not in the past' }),
  start_time: z.string().refine((startTime: string) => {
    const startTimeDate = parse(startTime, 'h:mm a', new Date());
    return !isNaN(startTimeDate.getTime());
  }, { message: 'Invalid start time format' }),
  end_time : z.string().min(1),
  // end_time: z.string().refine((endTime: string, data: { start_time: string }) => {
  //   const startTimeDate = parse(data.start_time, 'h:mm a', new Date());
  //   const endTimeDate = parse(endTime, 'h:mm a', new Date());
  //   const endTimePlus10Min = addMinutes(startTimeDate, 10);
  //   return endTimeDate >= endTimePlus10Min;
  // }, { message: 'End time must be at least 10 minutes after start time' }),
  formattedParticipants: z.array(z.string().min(1)).optional(),
});

const isOpen = ref(false);
const addExternalParticipant = ref(false);
const externalParticipantEmail = ref('');

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
  const validateForm = meetingForm.safeParse(meeting.value);
  if (!validateForm.success) {
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
    value: p.email,
  })) : []
);
</script>

<style scoped>
/* Add your scoped styles here */
</style>
