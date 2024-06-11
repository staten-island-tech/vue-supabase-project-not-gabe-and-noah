import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/Main.vue')
    },
    {
      path: '/table-view',
      name: 'table-view',
      component: () => import('../views/table-view.vue')
    }
  ]
})

export default router
