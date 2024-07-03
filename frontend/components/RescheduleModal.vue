<template>
  <div>
    <UButton
      class="inline-flex text-black items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
      label="Reschedule"
      @click="isOpen = true"
    />
    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Reserve {{}}
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
          :state="rescheduledMeeting"
          @submit.prevent="onSubmit"
        >
          <UFormGroup label="Room" name="room">
            <UInputMenu
              v-model="rescheduledMeeting.room"
              :options="rooms"
              placeholder="Select a room"
              id="room"
            />
          </UFormGroup>

          <UFormGroup label="Date" name="date">
            <UInput type="date" id="date" v-model="rescheduledMeeting.date" />
          </UFormGroup>

          <UFormGroup label="Start Time" name="start_time">
            <UInput
              id="startTime"
              type="time"
              v-model="rescheduledMeeting.start_time"
            />
          </UFormGroup>

          <UFormGroup label="End Time" name="end_time">
            <UInput
              id="endTime"
              type="time"
              v-model="rescheduledMeeting.end_time"
            />
          </UFormGroup>
          <div class="flex justify-end mt-4">
            <UButton label="Save" type="submit" @click="onSubmit" />
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
<script lang="ts" setup>
import {
  startOfDay,
  addMonths,
  isValid,
  parse,
  startOfToday,
  formatDate,
} from "date-fns";
import type { ResultOf } from "@graphql-typed-document-node/core";
import z from "zod";
import {
  GetMeetingIdDocument,
  GetRoomsByNameDocument,
  RescheduleMeetingDocument,
  SendEmailDocument,
  type GetRoomByIdDocument,
} from "~/gqlGen/types";
interface Participant {
  email: string;
  name: string;
}

interface ExternalParticipant {
  name: string;
}
const isOpen = ref(false);
type Room = ResultOf<typeof GetRoomByIdDocument>["room"][number];
const props = defineProps<{
  room: Room;
  participants: Participant[];
  external_participants: ExternalParticipant[];
  meeting_id: number;
  title : string | null | undefined
}>();
const selectedRoom = ref(props.room.room_name);
interface RescheduleForm {
  room: string;
  date: string;
  start_time: string;
  end_time: string;
}
const rescheduledMeeting = ref<RescheduleForm>({
  room: selectedRoom.value,
  date: "",
  start_time: "",
  end_time: "",
});

const parseDate = (dateStr: string) => {
  return startOfDay(parse(dateStr, "yyyy-MM-dd", new Date()));
};
const startOfDayToday = startOfDay(new Date());
const startOfDayInAMonth = addMonths(startOfDayToday, 1);
const meetingForm = z.object({
  room: z.string().min(1, "Room is required"),
  date: z
    .string()
    .date()
    .transform((str) => parseDate(str))
    .pipe(
      z
        .date()
        .min(startOfDayToday, "Start Date cannot be in the past")
        .max(
          startOfDayInAMonth,
          "Cannot schedule meetings more than a month in advance"
        )
    ),
  start_time: z
    .string()
    .refine(
      (val) => isValid(parse(val, "HH:mm", new Date())),
      "Start Time is Required"
    ),
  end_time: z
    .string()
    .refine(
      (val) => isValid(parse(val, "HH:mm", new Date())),
      "End Time is required"
    ),
});
const rooms = [
  "Conference Room A",
  "Boardroom",
  "Executive Suite",
  "Huddle Room",
];
const { mutate, loading, error } = useMutation(RescheduleMeetingDocument);
console.log(rescheduledMeeting.value.date);
console.log(rescheduledMeeting.value.start_time);

const sendMeetingEmail = async (
  title: string,
  to: string,
  date: string,
  start_time: string,
  end_time: string
) => {
  const { mutate, loading, error } = useMutation(SendEmailDocument);
  const result = await mutate({
    input: {
      title,
      to,
      date,
      start_time,
      end_time,
    },
  });
  return result;
};

const onSubmit = async () => {
  const { data: meetingData } = useAsyncQuery(GetMeetingIdDocument, {
    date: rescheduledMeeting.value.date,
    startTime: rescheduledMeeting.value.start_time,
    endTime: rescheduledMeeting.value.end_time,
  });
  const { data: roomData } = useAsyncQuery(GetRoomsByNameDocument, {
    name: rescheduledMeeting.value.room,
  });

  const room_id = computed(() => roomData.value?.room[0].room_id);
  const capacity = computed(() => roomData.value?.room[0].capacity);
  const reservedMeetings = computed(() => meetingData.value?.meeting);
  const currentTime = getCurrentMilitaryTime().split(":");
  const currentDate = formatDate(new Date(), "yyyy-MM-dd");
  const normalizedStartedTime = rescheduledMeeting.value.start_time.split(":");
  const normalizedEndTime = rescheduledMeeting.value.end_time.split(":");
  console.log(reservedMeetings.value);
  if (normalizedEndTime[0] <= normalizedStartedTime[0]) {
    if (
      parseInt(normalizedEndTime[1]) - parseInt(normalizedStartedTime[1]) <
        10 ||
      parseInt(normalizedEndTime[0]) < parseInt(normalizedStartedTime[0])
    ) {
      useCustomToast(
        "end time and start time must have at least a 10 min difference",
        "error"
      );
      return;
    }
  }
  if (
    rescheduledMeeting.value.date == currentDate &&
    (currentTime[0] > normalizedStartedTime[0] ||
      (currentTime[0] == normalizedStartedTime[0] &&
        currentTime[1] < normalizedStartedTime[1]))
  ) {
    useCustomToast("Time has already passed", "error");
    return;
  }
  if (
    capacity.value! <
    toRaw(props.participants.length) + toRaw(props.external_participants.length)
  ) {
    console.log(props.participants.length + props.external_participants.length);
    console.log(props.participants);
    useCustomToast("Room does not have the capacity for this meeting", "error");
    return;
  }
  if (reservedMeetings.value) {
    const filterMeetings = reservedMeetings.value!.filter((meeting) => {
      return props.meeting_id !== meeting.meeting_id;
    });
    const reservedRoomList = filterMeetings.map((meeting) => {
      return meeting.meetingroom.room_id;
    });
    const reservedParticipantsList = filterMeetings.flatMap((meeting) => {
      return meeting.participants.map((participant) => {
        return participant.email;
      });
    });
    if (toRaw(reservedRoomList.includes(room_id.value!))) {
      useCustomToast("The Room is reserved at this time", "error");
      return;
    }
    if (reservedParticipantsList) {
      const participants = props.participants;
      for (const participant of participants) {
        if (reservedParticipantsList.includes(participant.email)) {
          useCustomToast(
            "Person who is invivted to a meeting at the time is included",
            "error"
          );
          return;
        }
      }
    }
  }
  try {
    await mutate({
      meeting_id : props.meeting_id,
      date : rescheduledMeeting.value.date,
      start_time : rescheduledMeeting.value.start_time,
      end_time : rescheduledMeeting.value.end_time,
      room_id : room_id.value
    })
    for (const participant of props.participants) {
      await sendMeetingEmail(props.title!,participant.email,rescheduledMeeting.value.date,rescheduledMeeting.value.start_time,rescheduledMeeting.value.end_time)
    }
  } catch (error) {
    console.log(error)
    useCustomToast('Error updating a meeting','error')
  }
};
</script>
