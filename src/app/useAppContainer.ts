import { inject, provide } from 'vue'
import type { AdherentRepository } from '@/features/adherents/infrastructure/IAdherent.repository.ts'

export interface AppContainer {
  adherentRepository: AdherentRepository
}
export const appContainerKey = Symbol('appContainerKey') // <-- C'est un NOUVEAU Symbol, différent du premier


export function provideAppContainer(container: AppContainer) {
  provide(appContainerKey, container)
}

export function useAppContainer(): AppContainer {
  const container = inject<AppContainer>(appContainerKey)
  if (!container) throw new Error('AppContainer not provided')
  return container
}
