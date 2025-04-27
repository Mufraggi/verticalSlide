import { useEventBus } from '@vueuse/core'
import type { CreateAdherentCommand } from '@/features/adherents/createAdherent/createAdherent.usecase.ts'

export function useAdherentListEvents() {
  const started = useEventBus<void>('Adherents_LIST_STARTED')
  const retrieved = useEventBus<(CreateAdherentCommand & { id: number })[]>(
    'Adherents_LIST_RETRIEVED',
  )
  const failed = useEventBus<string>('Adherent_LIST_FAILED')

  return {
    emitListStarted: started.emit,
    onListStarted: started.on,

    emitRetrieved: retrieved.emit,
    onRetrieved: retrieved.on,

    emitListFailed: failed.emit,
    onListFailed: failed.on,
  }
}
