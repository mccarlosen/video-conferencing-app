<script setup lang="ts">
import { ref, type Ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, maxLength, minLength } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import ErrorMessage from './ErrorMessage.vue';

const accessKey: Ref<string> = ref('')
const rules = computed(() => ({
	accessKey: {
		required,
		maxLength: maxLength(24),
		minLength: minLength(24),
	}
}))
const router = useRouter()
const v$ = useVuelidate(rules, { accessKey })
const submitForm = async () => {
	const isCorrect = await v$.value.$validate()
	if (!isCorrect) {
		return;
	}
	router.push({ name: 'meeting', params: { id: accessKey.value } })
}
</script>

<template>
	<form @submit.prevent="submitForm" class="space-y-5">
		<ErrorMessage />
		<div class="flex flex-col">
			<label for="access-key" class="mb-2 inline-flex items-center">
				Your Meeting Access Key 
				<span><svg class="w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg></span>
			</label>
			<input v-model="accessKey" @blur="v$.accessKey.$touch" type="text" id="access-key" class="input-field mb-2" :class="{error: v$.accessKey.$error}" placeholder="Example: JyGuwNFgmoBYuxmgjXegMjQ2">
			<p class="text-sm font-light text-gray-600">Get an user access key from starting a meeting via the API or use one from an active meeting.</p>
			<p v-for="error of v$.accessKey.$errors" :key="error.$uid" class="text-sm font-light text-red-600" v-text="error.$message"></p>
		</div>
		<div class="flex justify-end">
			<button class="rounded bg-c1-500 text-black transition duration-150 ease-in-out hover:bg-c1-400 px-4 py-2">Join to Meeting</button>
		</div>
	</form>
</template>