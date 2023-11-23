<script setup lang="ts">
import { ref, type Ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'
import { useMeetingStore } from '@/stores/meeting';

const sendingForm: Ref<boolean> = ref(false)
const userName: Ref<string> = ref('')
const roomName: Ref<string> = ref('')
const rules = computed(() => ({
  userName: {
    required,
    maxLength: maxLength(36)
  },
	roomName: {
		required,
		maxLength: maxLength(36)
	}
}))
const v$ = useVuelidate(rules, { userName, roomName })

const submitForm = async () => {
  const isCorrect = await v$.value.$validate()
  if (!isCorrect) {
    return
  }
  const config = { userName: userName.value, roomName: roomName.value }
  try {
    // XZim5U3QlkPgaDjXln3fr332kKU9lBeRFSin0XcSio
    sendingForm.value = true
    const meetingStore = useMeetingStore()
    await meetingStore.createMeeting(config)
    sendingForm.value = false
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-5">
    <div class="flex flex-col">
      <label for="name-for-meeting" class="mb-2">Your Name</label>
      <input v-model="userName" @blur="v$.userName.$touch" type="text" id="name-for-meeting" class="input-field mb-2" :class="{error: v$.userName.$error}"  placeholder="Example: John Wick">
      <p class="text-sm font-light text-gray-600">This name will be displayed during the meeting.</p>
      <p v-for="error of v$.userName.$errors" :key="error.$uid" class="text-sm font-light text-red-600" v-text="error.$message"></p>
    </div>
    <div class="flex flex-col">
      <label for="room-name" class="mb-2 inline-flex items-center">
        Room Name
      </label>
      <input v-model="roomName" @blur="v$.roomName.$touch" type="text" id="room-name" class="input-field mb-2" :class="{error: v$.roomName.$error}" placeholder="Example: My First Meeting">
      <p v-for="error of v$.roomName.$errors" :key="error.$uid" class="text-sm font-light text-red-600" v-text="error.$message"></p>
    </div>
    <div class="flex justify-end">
      <button class="rounded bg-c1-500 text-black transition duration-150 ease-in-out hover:bg-c1-400 px-4 py-2" v-text="sendingForm ? 'Processing' : 'Get Started'"></button>
    </div>
  </form>
</template>