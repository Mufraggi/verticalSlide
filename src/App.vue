<script setup lang="ts">
import { RouterView } from 'vue-router'
import '@/index.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/AppSidebar.vue'
import { provideAppContainer } from '@/app/useAppContainer.ts'
import { FakeAdherentRepository } from '@/features/adherents/infrastructure/Adherent.repository.ts'
import { Toaster } from '@/components/ui/sonner'

provideAppContainer({ adherentRepository: new FakeAdherentRepository() })
</script>

<template>
  <SidebarProvider >
    <AppSidebar />
    <main>
      <SidebarTrigger />
      <RouterView />
      <Toaster richColors position="top-right" />
    </main>
  </SidebarProvider>
</template>
