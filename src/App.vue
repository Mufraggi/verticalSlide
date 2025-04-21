<script setup lang="ts">
import { RouterView } from 'vue-router'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<template>
  <head>
    <link href="/src/index.css" rel="stylesheet" />
    <title></title>
  </head>

  <SidebarProvider>
    <AppSidebar />
    <main>
      <SidebarTrigger />
      <RouterView />
    </main>
  </SidebarProvider>
</template>
