import { createRouter, createWebHistory } from 'vue-router'
import RateAll from '@/views/pages/RateAll.vue'
import RateTWD from '@/views/pages/RateTWD.vue'
import RateChange from '@/views/pages/RateChange.vue'
import Login from '@/views/Login/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/RateAll',
      component: RateAll
    },
    {
      path: '/rateTWD',
      component: RateTWD
    },
    {
      path: '/RateChange',
      component: RateChange
    }
  ]
})

export default router
