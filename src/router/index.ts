import { createRouter, createWebHistory } from 'vue-router'
import { createAdherentRoute } from '@/features/adherents/createAdherent/route.ts'
import CreateAdherentView from '@/features/adherents/createAdherent/ui/CreateAdherentView.vue'
import { listAdherentRoute } from '@/features/adherents/listAdherent/route.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: CreateAdherentView,
    },
    createAdherentRoute,
    listAdherentRoute,
  ],
})

export default router
