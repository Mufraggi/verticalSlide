<template>
  <div>
    <AdherentForm @submit="onSubmitForm" />
  </div>
</template>

<script setup lang="ts">
import { useCreateAdherentStore } from '@/features/adherents/createAdherent/createAdherent.store.ts'
import {
  type CreateAdherentCommand,
  useCreateAdherentUseCase,
} from '@/features/adherents/createAdherent/createAdherent.usecase.ts'
import AdherentForm from '@/features/adherents/createAdherent/ui/components/AdherentForm.vue'
import { useRouter } from 'vue-router'
import { useAdherentEvents } from '@/features/adherents/createAdherent/adherentCreated.event.ts'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const { onCreated, onCreationStarted, onCreationFailed } = useAdherentEvents()
const { execute } = useCreateAdherentUseCase()
const router = useRouter()

const status = ref<'success' | 'error' | 'pending' | null>(null)
const error = ref<string | null>(null)
onCreated((adherent) => {
  console.log('Adherent created:', adherent)
  status.value = 'success'
  router.push('/about')
  toast.success('Adherent create')
})
onCreationStarted((adherent) => {
  console.log('Adherent created:', adherent)
  status.value = 'pending'
})
onCreationFailed((adherent) => {
  console.log('Adherent created:', adherent)
  status.value = 'error'
  error.value = adherent
  toast.error('Error during the adherent creation')
})

const onSubmitForm: (formData: CreateAdherentCommand) => Promise<void> = async (
  formData: CreateAdherentCommand,
) => {
  try {
    await execute(formData)
  } catch (error) {
    console.error("Erreur lors de la création de l'adhérent:", error)
  }
}
</script>
