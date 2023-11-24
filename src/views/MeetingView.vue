<script setup lang="ts">
import type { onMounted } from 'vue';
import { useMeetingService } from '@/composables/meeting';
</script>

<template>
  <div class="flex w-full h-full bg-white">
		<div class="flex items-center justify-center flex-1 w-full min-h-full">
			<div class="w-full h-full flex flex-col">
				<div class="flex-1 flex flex-col items-center justify-center space-y-3 py-5">
					<div class="flex items-start gap-x-5 h-full">
						<div class="space-y-4">
							<div class="w-full font-bold text-2xl text-left">
								Hello World
							</div>
							<div class="bg-gray-600 overflow-hidden rounded-md shadow-md">
								<video class="h-full max-h-[calc(100vh_-170px)]" autoplay>
									<source src="../assets/big_buck_bunny_720p_stereo.ogg" type="video/ogg">
									Your browser does not support HTML video.
								</video>
							</div>
						</div>
						<div class="w-16 bg-black rounded-md px-3 py-5">
							<div class="flex flex-col justify-center space-y-3">
								<button class="bg-gray-800 w-[40px] h-[40px] rounded-lg p-2">
									<svg class="w-6 fill-c1-400" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 475.085 475.085" style="enable-background:new 0 0 512 512" xml:space="preserve">
										<path d="M237.541 328.897c25.128 0 46.632-8.946 64.523-26.83 17.888-17.884 26.833-39.399 26.833-64.525V91.365c0-25.126-8.938-46.632-26.833-64.525C284.173 8.951 262.669 0 237.541 0c-25.125 0-46.632 8.951-64.524 26.84-17.893 17.89-26.838 39.399-26.838 64.525v146.177c0 25.125 8.949 46.641 26.838 64.525 17.889 17.884 39.399 26.83 64.524 26.83z" opacity="1" data-original="#000000"></path>
										<path d="M396.563 188.15c-3.606-3.617-7.898-5.426-12.847-5.426-4.944 0-9.226 1.809-12.847 5.426-3.613 3.616-5.421 7.898-5.421 12.845v36.547c0 35.214-12.518 65.333-37.548 90.362-25.022 25.03-55.145 37.545-90.36 37.545-35.214 0-65.334-12.515-90.365-37.545-25.028-25.022-37.541-55.147-37.541-90.362v-36.547c0-4.947-1.809-9.229-5.424-12.845-3.617-3.617-7.895-5.426-12.847-5.426s-9.235 1.809-12.85 5.426c-3.618 3.616-5.426 7.898-5.426 12.845v36.547c0 42.065 14.04 78.659 42.112 109.776 28.073 31.118 62.762 48.961 104.068 53.526v37.691h-73.089c-4.949 0-9.231 1.811-12.847 5.428-3.617 3.614-5.426 7.898-5.426 12.847 0 4.941 1.809 9.233 5.426 12.847 3.616 3.614 7.898 5.428 12.847 5.428h182.719c4.948 0 9.236-1.813 12.847-5.428 3.621-3.613 5.431-7.905 5.431-12.847 0-4.948-1.81-9.232-5.431-12.847-3.61-3.617-7.898-5.428-12.847-5.428h-73.08v-37.691c41.299-4.565 75.985-22.408 104.061-53.526 28.076-31.117 42.12-67.711 42.12-109.776v-36.547c0-4.946-1.813-9.225-5.435-12.845z" opacity="1" data-original="#000000"></path>
									</svg>
								</button>
								<button class="bg-gray-800 w-[40px] h-[40px] rounded-lg p-2">
									<svg class="w-6 fill-c1-400" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 467.968 467.968" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M264.704 96.512H51.2c-28.16 0-51.2 23.04-51.2 51.2v172.544c0 28.16 23.04 51.2 51.2 51.2h213.504c28.16 0 51.2-23.04 51.2-51.2V147.712c0-28.672-23.04-51.2-51.2-51.2zM430.08 124.672c-3.072.512-6.144 2.048-8.704 3.584l-79.872 46.08V293.12l80.384 46.08c14.848 8.704 33.28 3.584 41.984-11.264 2.56-4.608 4.096-9.728 4.096-15.36V154.368c0-18.944-17.92-34.304-37.888-29.696z" opacity="1" data-original="#000000"></path></g></svg>
								</button>
								<button class="bg-gray-800 w-[40px] h-[40px] rounded-lg p-2">
									<svg class="w-6 fill-[#E8E8E8]" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 134 134" style="enable-background:new 0 0 512 512" xml:space="preserve" fill-rule="evenodd"><g><path d="M37.5 100H20.833c-6.903 0-12.5-5.596-12.5-12.5V33.333c0-6.903 5.597-12.5 12.5-12.5H112.5c6.904 0 12.5 5.597 12.5 12.5V87.5c0 6.904-5.596 12.5-12.5 12.5H95.833v3.247a9.253 9.253 0 0 1-9.253 9.253H46.753a9.253 9.253 0 0 1-9.253-9.253zm8.333 0v3.247c0 .508.412.92.92.92H86.58a.92.92 0 0 0 .92-.92V100zM62.5 55.893l-4.672 4.672c-1.626 1.626-4.267 1.626-5.893 0s-1.626-4.267 0-5.893L63.72 42.887a4.168 4.168 0 0 1 5.893 0l11.785 11.785c1.626 1.626 1.626 4.267 0 5.893s-4.266 1.626-5.892 0l-4.673-4.672V75c0 2.3-1.867 4.167-4.166 4.167A4.169 4.169 0 0 1 62.5 75z" opacity="1" data-original="#000000"></path></g></svg>
								</button>
								<button class="bg-gray-800 w-[40px] h-[40px] rounded-lg p-2">
									<svg class="w-6 fill-[#E8E8E8]" version="1.1" x="0" y="0" viewBox="0 0 20.003321 8.9971783" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g transform="translate(-1.9978203,-7.0002496)"><path d="m 21.3,15.38 a 1.378,1.378 0 0 1 -1.5,0.572 l -2.724,-0.7 a 1.886,1.886 0 0 1 -1.38,-2.2 l 0.249,-1.228 a 11.426,11.426 0 0 0 -7.86,-0.006 l 0.242,1.238 A 1.887,1.887 0 0 1 6.94,15.252 L 4.2,15.945 A 1.383,1.383 0 0 1 2.712,15.379 4.579,4.579 0 0 1 4.1,9.072 16.039,16.039 0 0 1 19.892,9.085 4.584,4.584 0 0 1 21.3,15.38 Z" opacity="1" data-original="#000000" /></g></svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>