import { createRouter, createWebHistory } from 'vue-router'
import { createAdherentRoute } from '@/features/adherents/createAdherent/route.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [createAdherentRoute],
})

export default router
