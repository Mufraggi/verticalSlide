import { createRouter, createWebHistory } from 'vue-router'
import CreateAdherentView from '@/features/adherents/createAdherent/ui/CreateAdherentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CreateAdherentView,
    },
  ],
})


export default router
