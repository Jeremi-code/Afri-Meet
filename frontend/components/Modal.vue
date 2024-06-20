<template>
  <UModal v-model="isOpen" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Reserve {{ name }}
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="closeModal" />
        </div>
      </template>
      <form class="space-y-4">
        <div class="relative mt-1">
          <label for="title">Meeting Title</label>
          <UInput id="title" />
        </div>
        <div class="relative mt-1">
          <label for="room">Room</label>
          <UInputMenu v-model="name" :options="rooms" placeholder="Select a room" id="room" />
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
          <USelectMenu v-model="selectedParticipants" multiple :options="participants" id="participants">
            <template #leading>
              <UIcon v-if="selectedParticipants.icon" :name="(selectedParticipants.icon as string)" class="w-5 h-5" />
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
import { ref } from 'vue';

const modalProps = defineProps<{
  id: number;
  name: string;
  capacity: number;
  isOpen: boolean;
}>();

interface Participant {
  id: string;
  label: string;
  href?: string;
  target?: string;
  avatar?: { src: string };
  icon?: string;
}

const participants: Participant[] = [
  {
    id: 'benjamincanac',
    label: 'benjamincanac',
    href: 'https://github.com/benjamincanac',
    target: '_blank',
    avatar: { src: 'https://avatars.githubusercontent.com/u/739984?v=4' }
  },
  {
    id: 'Atinux',
    label: 'Atinux',
    href: 'https://github.com/Atinux',
    target: '_blank',
    avatar: { src: 'https://avatars.githubusercontent.com/u/904724?v=4' }
  },
  {
    id: 'smarroufin',
    label: 'smarroufin',
    href: 'https://github.com/smarroufin',
    target: '_blank',
    avatar: { src: 'https://avatars.githubusercontent.com/u/7547335?v=4' }
  },
  {
    id: 'nobody',
    label: 'Nobody',
    icon: 'i-heroicons-user-circle'
  }
];
const isOpen = ref<boolean>(modalProps.isOpen)

const closeModal = () => {
  isOpen.value = false
};

const selectedParticipants = ref<Participant>(participants[0]);
const rooms = ['Conference Room A', 'Boardroom', 'Executive Suite', 'Huddle Room'];
</script>
