import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/IndexPage.vue'),
  },
  {
    path: '/control',
    component: () => import('@/components/ControlCenter.vue'),
  },
  {
    path: '/manage',
    component: () => import('@/components/UserManager.vue'),
  },
  {
    path: '/chat',
    component: () => import('@/components/ChatView.vue'),
  },
  {
    path: '/settings',
    component: () => import('@/components/WebUISettings.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
