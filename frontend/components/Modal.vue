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
          <USelectMenu v-if="participants !== null" v-model="selectedParticipants" multiple :options="formattedParticipants" id="participants">
            <template #leading>
              <!-- {{ selectedParticipants.map(p => `${p.first_name} ${p.last_name} (${p.email})`).join(', ') }} -->
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
</template>

<script lang="ts" setup>
import type { ResultOf } from '@graphql-typed-document-node/core';
import { GetUsersDocument, type GetRoomByIdDocument } from '~/gqlGen/types';
import { ref, computed, watchEffect, toRaw } from 'vue';

type Room = ResultOf<typeof GetRoomByIdDocument>['room'][number];
const props = defineProps<{
  room: Room
}>();

const isOpen = ref(false);

interface Participants {
  first_name: string;
  last_name: string;
  email: string;
}

const participants = ref<Participants[] | null>(null);
const { data } = useAsyncQuery(GetUsersDocument);
const selectedParticipants = ref<Participants[]>([]);

watchEffect(() => {
  if (data.value) {
    participants.value = data.value.users;
  }
});

const selectedRoom = ref(props.room.room_name);

const rooms = ['Conference Room A', 'Boardroom', 'Executive Suite', 'Huddle Room'];

const formattedParticipants = computed(() =>
  participants.value ? participants.value.map(p => ({
    label: `${p.first_name} ${p.last_name} (${p.email})`,
    ...p
  })) : []
);
</script>
