import { createRouter, createWebHistory } from 'vue-router'

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
      component: () => import('../views/Meeting.vue')
    }
  ]
})

export default router
