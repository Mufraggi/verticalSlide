<template>
  <div>
    <AdherentForm @submit="onSubmitForm" />

    <div v-if="store.success">✔️ Créé !</div>
    <div v-if="store.error">❌ {{ store.error }}</div>
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
const {execute} = useCreateAdherentUseCase()
const router = useRouter()
const store = useCreateAdherentStore()

const onSubmitForm: (formData: CreateAdherentCommand) => Promise<void> = async (
  formData: CreateAdherentCommand,
) => {
  try {
    await execute(formData)
    await router.push('/about')
  } catch (error) {
    // L'erreur est déjà gérée dans le store
    console.error("Erreur lors de la création de l'adhérent:", error)
  }
}
</script>
