<script setup lang="ts">
import { ref } from 'vue'
const msg = 'Hello World'
const panel = ref('participants')
const togglePanel = (panelName: string) => {
	panel.value = panelName
}
</script>

<template>
  <main class="flex w-full h-screen bg-white">
	<div class="flex flex-col items-center justify-between w-[65px] min-h-full bg-white p-3 border-r shadow-lg">
		<img src="./assets/logo.png" alt="Logo">
		<div class="w-[38px] h-[38px] rounded-full border border-gray-500 overflow-hidden">
			<img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=60&h=200&w=120&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fFBlcmZpbCUyMGRlJTIwdXN1YXJpb3xlc3wwfHx8fDE2OTkyMzU3MzV8MA&ixlib=rb-4.0.3" alt="Foto Profile" class="object-cover object-center">
		</div>
	</div>
	<div class="flex items-center justify-center flex-1 w-full min-h-full px-8">
		<div class="w-full h-full flex flex-col">
			<div class="flex-1 flex flex-col justify-center space-y-3">
				<div class="font-bold text-2xl">
					{{ msg }}
				</div>
				<div class="overflow-hidden shadow-md h-full max-h-[calc(100vh_-150px)] rounded-md">
					<video class="w-full" autoplay>
						<source src="./assets/big_buck_bunny_720p_stereo.ogg" type="video/ogg">
						Your browser does not support HTML video.
					</video>
				</div>
			</div>
			<div class="flex justify-center">
				<div class="flex space-x-3 pb-5 pt-1">
					<button class="bg-black rounded px-4 py-2">
						<svg class="w-6 fill-[#00FFFF]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 475.085 475.085" style="enable-background:new 0 0 512 512" xml:space="preserve">
							<path d="M237.541 328.897c25.128 0 46.632-8.946 64.523-26.83 17.888-17.884 26.833-39.399 26.833-64.525V91.365c0-25.126-8.938-46.632-26.833-64.525C284.173 8.951 262.669 0 237.541 0c-25.125 0-46.632 8.951-64.524 26.84-17.893 17.89-26.838 39.399-26.838 64.525v146.177c0 25.125 8.949 46.641 26.838 64.525 17.889 17.884 39.399 26.83 64.524 26.83z" opacity="1" data-original="#000000"></path>
							<path d="M396.563 188.15c-3.606-3.617-7.898-5.426-12.847-5.426-4.944 0-9.226 1.809-12.847 5.426-3.613 3.616-5.421 7.898-5.421 12.845v36.547c0 35.214-12.518 65.333-37.548 90.362-25.022 25.03-55.145 37.545-90.36 37.545-35.214 0-65.334-12.515-90.365-37.545-25.028-25.022-37.541-55.147-37.541-90.362v-36.547c0-4.947-1.809-9.229-5.424-12.845-3.617-3.617-7.895-5.426-12.847-5.426s-9.235 1.809-12.85 5.426c-3.618 3.616-5.426 7.898-5.426 12.845v36.547c0 42.065 14.04 78.659 42.112 109.776 28.073 31.118 62.762 48.961 104.068 53.526v37.691h-73.089c-4.949 0-9.231 1.811-12.847 5.428-3.617 3.614-5.426 7.898-5.426 12.847 0 4.941 1.809 9.233 5.426 12.847 3.616 3.614 7.898 5.428 12.847 5.428h182.719c4.948 0 9.236-1.813 12.847-5.428 3.621-3.613 5.431-7.905 5.431-12.847 0-4.948-1.81-9.232-5.431-12.847-3.61-3.617-7.898-5.428-12.847-5.428h-73.08v-37.691c41.299-4.565 75.985-22.408 104.061-53.526 28.076-31.117 42.12-67.711 42.12-109.776v-36.547c0-4.946-1.813-9.225-5.435-12.845z" opacity="1" data-original="#000000"></path>
						</svg>
					</button>
					<button class="bg-black rounded px-4 py-2">
						<svg class="w-6 fill-[#00FFFF]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 467.968 467.968" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M264.704 96.512H51.2c-28.16 0-51.2 23.04-51.2 51.2v172.544c0 28.16 23.04 51.2 51.2 51.2h213.504c28.16 0 51.2-23.04 51.2-51.2V147.712c0-28.672-23.04-51.2-51.2-51.2zM430.08 124.672c-3.072.512-6.144 2.048-8.704 3.584l-79.872 46.08V293.12l80.384 46.08c14.848 8.704 33.28 3.584 41.984-11.264 2.56-4.608 4.096-9.728 4.096-15.36V154.368c0-18.944-17.92-34.304-37.888-29.696z" opacity="1" data-original="#000000"></path></g></svg>
					</button>
					<button class="bg-black rounded px-4 py-2">
						<svg class="w-6 fill-[#E8E8E8]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 134 134" style="enable-background:new 0 0 512 512" xml:space="preserve" fill-rule="evenodd"><g><path d="M37.5 100H20.833c-6.903 0-12.5-5.596-12.5-12.5V33.333c0-6.903 5.597-12.5 12.5-12.5H112.5c6.904 0 12.5 5.597 12.5 12.5V87.5c0 6.904-5.596 12.5-12.5 12.5H95.833v3.247a9.253 9.253 0 0 1-9.253 9.253H46.753a9.253 9.253 0 0 1-9.253-9.253zm8.333 0v3.247c0 .508.412.92.92.92H86.58a.92.92 0 0 0 .92-.92V100zM62.5 55.893l-4.672 4.672c-1.626 1.626-4.267 1.626-5.893 0s-1.626-4.267 0-5.893L63.72 42.887a4.168 4.168 0 0 1 5.893 0l11.785 11.785c1.626 1.626 1.626 4.267 0 5.893s-4.266 1.626-5.892 0l-4.673-4.672V75c0 2.3-1.867 4.167-4.166 4.167A4.169 4.169 0 0 1 62.5 75z" opacity="1" data-original="#000000"></path></g></svg>
					</button>
					<button class="bg-[#980000] rounded px-4 py-2">
						<svg class="w-6 fill-[#E8E8E8]" version="1.1" x="0" y="0" viewBox="0 0 20.003321 8.9971783" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g transform="translate(-1.9978203,-7.0002496)"><path d="m 21.3,15.38 a 1.378,1.378 0 0 1 -1.5,0.572 l -2.724,-0.7 a 1.886,1.886 0 0 1 -1.38,-2.2 l 0.249,-1.228 a 11.426,11.426 0 0 0 -7.86,-0.006 l 0.242,1.238 A 1.887,1.887 0 0 1 6.94,15.252 L 4.2,15.945 A 1.383,1.383 0 0 1 2.712,15.379 4.579,4.579 0 0 1 4.1,9.072 16.039,16.039 0 0 1 19.892,9.085 4.584,4.584 0 0 1 21.3,15.38 Z" opacity="1" data-original="#000000" /></g></svg>
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col w-[320px] min-h-full max-h-full bg-white border-l shadow-md">
		<div class="bg-white px-3 py-2 space-x-3 border-b border-gray-200">
			<button @click="togglePanel('participants')" class="font-semibold px-4 py-2 rounded">
				Participantes
			</button>
			<button @click="togglePanel('chat')" class="text-white font-semibold px-4 py-2 bg-black rounded">
				Chat
			</button>
		</div>
		<div class="flex-1 overflow-x-hidden overflow-y-auto p-3">
			<!-- chat -->
			<div v-if="panel == 'chat'">
				<!-- message -->
				<div class="flex space-x-2 text-white text-sm rounded-xl bg-gray-800 shadow p-3">
					<div class="flex-shrink-0 w-[28px] h-[28px] rounded-full border-2 border-black overflow-hidden">
						<img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=60&h=200&w=120&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTh8fFBlcmZpbCUyMGRlJTIwdXN1YXJpb3xlc3wwfHx8fDE2OTkyMzU3MzV8MA&ixlib=rb-4.0.3" alt="Foto Profile" class="object-cover object-center">
					</div>
					<div>
						Hello! How are you? I'm from Venezuela, Nice to meet you.
					</div>
				</div>
			</div>
		</div>
		<div class="bg-white border-t border-gray-200 p-3">
			<div class="relative">
				<input type="text" class="w-full bg-gray-200 placeholder:text-gray-600 rounded px-3 py-2 focus:ring-2 focus:ring-[#0c1d29] focus:outline-none" placeholder="Escriba su mensaje">
				<button class="absolute right-1 top-1 rounded-full bg-[#171717] flex items-center justify-center w-8 h-8">
					<svg class="w-4 fill-white" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" fill-rule="evenodd"><g><path d="M22.736 3.297a1.275 1.275 0 0 0-1.852-1.318l-18.952 9.95a1.272 1.272 0 0 0 .179 2.333L8 16.281 19 6l-8.902 11 8.596 2.947a1.276 1.276 0 0 0 1.673-1.014zM8.832 17.623v3.27a1.274 1.274 0 0 0 2.12.952l2.838-2.522z" opacity="1" data-original="#000000"></path></g></svg>
				</button>
			</div>
		</div>
	</div>
  </main>
</template>