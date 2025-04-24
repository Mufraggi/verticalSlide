import { describe, it, expect, vi, beforeEach } from 'vitest'

import { validateAdherentService } from '@/features/adherents/createAdherent/create-adherent-validator.service.ts'
import {
  type CreateAdherentCommand,
  useCreateAdherentUseCase,
} from '@/features/adherents/createAdherent/createAdherent.usecase.ts'

const mockAdherentRepository = {
  create: vi.fn(), // Mock de la fonction 'create'
}
vi.mock('@/app/useAppContainer.ts', () => ({
  useAppContainer: vi.fn(() => ({
    adherentRepository: mockAdherentRepository,
  })),
}))

// 2. Mock du bus d'événements via useAdherentEvents
const mockBus = {
  emitCreationStarted: vi.fn(),
  emitCreated: vi.fn(),
  emitCreationFailed: vi.fn(),
}
vi.mock('@/features/adherents/createAdherent/adherentCreated.event.ts', () => ({
  useAdherentEvents: vi.fn(() => mockBus),
}))

describe('useCreateAdherentUseCase', () => {
  // Réinitialise les mocks avant chaque test pour éviter les interférences
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Fonction utilitaire pour créer une commande valide de base
  const createValidCommand = (): CreateAdherentCommand => ({
    lastName: 'Doe',
    firstName: 'John',
    gender: 'Male',
    email: 'john.doe@example.com',
    phone: '123456789',
  })

  it('devrait appeler le repository et émettre les événements de succès si la commande est valide', async () => {
    const command = createValidCommand()
    const { execute } = useCreateAdherentUseCase()

    mockAdherentRepository.create.mockResolvedValue(undefined)

    await execute(command)

    expect(mockBus.emitCreationStarted).toHaveBeenCalledOnce()
    expect(mockBus.emitCreated).toHaveBeenCalledOnce()
    expect(mockAdherentRepository.create).toHaveBeenCalledOnce()
    expect(mockAdherentRepository.create).toHaveBeenCalledWith(command)
    expect(mockBus.emitCreationFailed).not.toHaveBeenCalled()
  })

  it("devrait émettre un événement d'échec et ne pas appeler le repository si la validation échoue", async () => {
    const command = createValidCommand()
    const repositoryError = new Error('Erreur de base de données')

    const { execute } = useCreateAdherentUseCase()
    mockAdherentRepository.create.mockRejectedValue(repositoryError)

    await execute(command)

    expect(mockBus.emitCreationFailed).toHaveBeenCalledTimes(1)
    expect(mockBus.emitCreationFailed).toHaveBeenCalledWith(`${repositoryError.message}`)
    expect(mockBus.emitCreationFailed).toHaveBeenCalledWith(`${repositoryError.message}`)
    expect(mockBus.emitCreated).not.toHaveBeenCalled()
  })

  it("devrait émettre un événement d'échec si l'appel au repository échoue", async () => {
    const command = createValidCommand()
    const repositoryError = new Error('Erreur de base de données')
    const { execute } = useCreateAdherentUseCase()
    mockAdherentRepository.create.mockRejectedValue(repositoryError)

    await execute(command)

    expect(mockBus.emitCreationStarted).toHaveBeenCalledOnce()
    expect(mockAdherentRepository.create).toHaveBeenCalledOnce()
    expect(mockAdherentRepository.create).toHaveBeenCalledWith(command)
    expect(mockBus.emitCreationFailed).toHaveBeenCalledOnce()
    expect(mockBus.emitCreationFailed).toHaveBeenCalledWith(repositoryError.message)
    expect(mockBus.emitCreated).not.toHaveBeenCalled()
  })

  it("devrait émettre un événement d'échec avec un message générique si l'erreur du repository n'est pas une instance d'Error", async () => {
    const command = createValidCommand()
    const repositoryError = "une chaîne d'erreur"
    const { execute } = useCreateAdherentUseCase()
    mockAdherentRepository.create.mockRejectedValue(repositoryError)

    await execute(command)

    expect(mockBus.emitCreationStarted).toHaveBeenCalledOnce()
    expect(mockAdherentRepository.create).toHaveBeenCalledOnce()
    expect(mockBus.emitCreationFailed).toHaveBeenCalledOnce()
    expect(mockBus.emitCreationFailed).toHaveBeenCalledWith('Erreur inconnue')
    expect(mockBus.emitCreated).not.toHaveBeenCalled()
  })
})
