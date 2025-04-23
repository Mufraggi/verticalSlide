<template>
  <div>
    <AdherentForm @submit="onSubmitForm" />

    <div v-if="status === 'success'">✔️ Créé !</div>
    <div v-if="status ==='error'">❌ {{ store.error }}</div>
  </div>
</template>

<script setup lang="ts">
import { useCreateAdherentStore } from '@/features/adherents/createAdherent/createAdherent.store.ts'
import {
  type CreateAdherentCommand,
  useCreateAdherentUseCase,
} from '@/features/adherents/createAdherent/createAdherent.usecase.ts'
import AdherentForm from '@/features/adherents/createAdherent/components/AdherentForm.vue'
import { useRouter } from 'vue-router'
import { useAdherentEvents } from '@/features/adherents/createAdherent/adherentCreated.event.ts'
import { ref } from 'vue'

const { onCreated, onCreationStarted, onCreationFailed } = useAdherentEvents()
const { execute } = useCreateAdherentUseCase()
const router = useRouter()
const store = useCreateAdherentStore()


const status = ref<'success'| 'error'| 'pending' | null>(null)
const error = ref<string | null>(null)
onCreated((adherent) => {
  console.log('Adherent created:', adherent)
  status.value = 'success'
})
onCreationStarted((adherent) => {
  console.log('Adherent created:', adherent)
  status.value = 'pending'
})
onCreationFailed((adherent) => {
  console.log('Adherent created:', adherent)
  status.value = 'error'
  error.value = adherent
})

const onSubmitForm: (formData: CreateAdherentCommand) => Promise<void> = async (
  formData: CreateAdherentCommand,
) => {
  try {
    await execute(formData)
   // await router.push('/about')
  } catch (error) {
    console.error("Erreur lors de la création de l'adhérent:", error)
  }
}
</script>
