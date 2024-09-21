import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      children: [
        {
          path: '/call-page',
          name: 'call-page',
          component: () => import('@/views/Dashboard/CallPage.vue'),
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test.vue')
    }
  ]
})

export default router
