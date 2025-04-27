import { useAppContainer } from '@/app/useAppContainer.ts'
import { useAdherentListEvents } from '@/features/adherents/listAdherent/adherentList.event.ts'

export function useListAdherentUseCase() {
  const { adherentRepository } = useAppContainer()
  const bus = useAdherentListEvents()

  async function execute() {
    try {
      bus.emitListStarted()
      const adherents = await adherentRepository.findAll()
      bus.emitRetrieved(adherents)
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Erreur inconnue'
      bus.emitListFailed(message)
    }
  }
  return { execute }
}
