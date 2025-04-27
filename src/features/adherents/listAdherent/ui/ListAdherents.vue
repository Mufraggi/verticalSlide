<script setup lang="ts">
import { onMounted } from 'vue'
import { columns } from './components/columns'
import DataTable from '@/features/adherents/listAdherent/ui/components/data-table.vue'
import { useListAdherentUseCase } from '@/features/adherents/listAdherent/listAdherent.usecase' // Importez votre use case
import { useAdherentListEvents } from '@/features/adherents/listAdherent/adherentList.event'
import { useAdherentsStore } from '@/features/adherents/listAdherent/listAdherent.store.ts'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'vue-sonner'

// Utilisez le store Pinia pour récupérer les données et l'état
const adherentsStore = useAdherentsStore()
const { execute } = useListAdherentUseCase()
const events = useAdherentListEvents()

// Configurez les gestionnaires d'événements pour mettre à jour le store
events.onListStarted(() => {
  adherentsStore.startLoading()
})

events.onRetrieved((adherents) => {
  adherentsStore.setAdherents(adherents)
})

events.onListFailed((error) => {
  toast.error('Error during the adherent creation')
  adherentsStore.setError(error)
})

// Chargez les données lors du montage du composant
onMounted(async () => {
  await execute()
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <div v-if="adherentsStore.isLoading" class="flex flex-col space-y-3">
      <Skeleton class="h-[125px] w-[250px] rounded-xl" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
      </div>
    </div>

    <DataTable v-else :columns="columns" :data="adherentsStore.adherents" />
  </div>
</template>
