import { createRouter, createWebHistory, useRouter } from 'vue-router'
import { useMeetingService } from '@/composables/meeting'

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
      /* beforeEnter: (to) => {
        const router = useRouter()
        const useMeeting = useMeetingService()
        const id = to.params.id
        const { status } = useMeeting.checkAccessKey(id)
        if (status.value !== 200) {
          router.push({ name: 'home' })
          return false;
        }
      } */
    }
  ]
})

export default router
