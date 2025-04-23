import { useEventBus } from '@vueuse/core'

export function useAdherentEvents() {

  const started = useEventBus<void>('Adherent_CREATION_STARTED')
  const created = useEventBus<void>('Adherent_CREATED')
  const failed = useEventBus<string>('Adherent_CREATION_FAILED')

  return {
    emitCreationStarted: started.emit,
    onCreationStarted: started.on,

    emitCreated: created.emit,
    onCreated: created.on,

    emitCreationFailed: failed.emit,
    onCreationFailed: failed.on,
  }
}
