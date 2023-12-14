import { createRouter, createWebHistory, useRouter } from 'vue-router'
import { useMeetingService } from '@/composables/meeting'
import { useMeetingStore } from '@/stores/meeting'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/meeting/:id',
      name: 'meeting',
      component: () => import('../views/MeetingView.vue'),
      beforeEnter: async (to) => {
        const router = useRouter()
        const meetingStore = useMeetingStore()
        const useMeeting = useMeetingService()
        const id = to.params.id     
        try {
          const response = await useMeeting.checkAccessKey(id)
          if (response.status == 200) {
            const json = await response.json()
            meetingStore.meeting = json
            return true
          }
          const data = await response.json()
          meetingStore.errorFormMessage = data.error
          router.push({ name: 'home' })
          return false
        } catch (err: any) {
          meetingStore.errorFormMessage = err
          router.push({ name: 'home' })
          return false
        }
      }
    }
  ]
})

export default router
