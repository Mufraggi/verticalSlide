import { useAdherentEvents } from '@/features/adherents/createAdherent/adherentCreated.event.ts'
import { useCreateAdherentStore } from '@/features/adherents/createAdherent/createAdherent.store.ts'
import { useAppContainer } from '@/app/useAppContainer.ts'
import { validateAdherentService } from '@/features/adherents/createAdherent/create-adherent-validator.service.ts'

// Define a type to represent a sport practice
export type Practice = {
  name: string
  frequency: string // E.g., "3 times a week"
  level: string // E.g., "Beginner", "Intermediate", "Advanced"
}

// Define a type to represent a gym member
export type CreateAdherentCommand = {
  lastName: string
  //firstName: string
  //BDD: Date
  //gender: 'Male' | 'Female' | 'Other'
  //email: string
 // phone: string | null
  //<practices: Practice[] // List of sport practices for the member
  //registrationDate: Date // Registration date, e.g., "2023-10-01"
  //comments: string | null // Field for additional comments or notes
}

export function useCreateAdherentUseCase() {
  const { adherentRepository } = useAppContainer()
  const bus = useAdherentEvents()
  const store = useCreateAdherentStore()

  async function execute(command: CreateAdherentCommand) {
    // Validation des données
    const errors = validateAdherentService(command)
    if (errors.length > 0) {
      errors.forEach(error =>
        bus.emitCreationFailed(`Échec de la création : ${error}`)
      )
      return
    }

    try {
      store.start()
      bus.emitCreationStarted()

      // Appel au repository avec gestion du retour
      await adherentRepository.create(command)

      store.success()
      bus.emitCreated()
    } catch (error) {
      // Gestion d'erreur améliorée
      const message = error instanceof Error ? error.message : 'Erreur inconnue'
      store.fail(message)
      bus.emitCreationFailed(message)
    }
  }

  return { execute }
}
