import { describe, it, expect, vi, beforeEach } from 'vitest'

import {
  type CreateAdherentCommand,
  useCreateAdherentUseCase,
} from '@/features/adherents/createAdherent/createAdherent.usecase.ts'

const mockAdherentRepository = {
  create: vi.fn(), // Mock of the 'create' function
}
vi.mock('@/app/useAppContainer.ts', () => ({
  useAppContainer: vi.fn(() => ({
    adherentRepository: mockAdherentRepository,
  })),
}))

const mockBus = {
  emitCreationStarted: vi.fn(),
  emitCreated: vi.fn(),
  emitCreationFailed: vi.fn(),
}
vi.mock('@/features/adherents/createAdherent/adherentCreated.event.ts', () => ({
  useAdherentEvents: vi.fn(() => mockBus),
}))

describe('useCreateAdherentUseCase', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const createValidCommand = (): CreateAdherentCommand => ({
    lastName: 'Doe',
    firstName: 'John',
    gender: 'Male',
    email: 'john.doe@example.com',
    phone: '123456789',
  })

  it('should call the repository and emit success events if the command is valid', async () => {
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

  it('should emit a failure event and not call the repository if validation fails', async () => {
    const command = createValidCommand()
    const repositoryError = new Error('Database error')

    const { execute } = useCreateAdherentUseCase()
    mockAdherentRepository.create.mockRejectedValue(repositoryError)

    await execute(command)

    expect(mockBus.emitCreationFailed).toHaveBeenCalledTimes(1)
    expect(mockBus.emitCreationFailed).toHaveBeenCalledWith(`${repositoryError.message}`)
    expect(mockBus.emitCreationFailed).toHaveBeenCalledWith(`${repositoryError.message}`)
    expect(mockBus.emitCreated).not.toHaveBeenCalled()
  })

  it('should emit a failure event if the repository call fails', async () => {
    const command = createValidCommand()
    const repositoryError = new Error('Database error')
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

  it('should emit a failure event with a generic message if the repository error is not an instance of Error', async () => {
    const command = createValidCommand()
    const repositoryError = 'an error string'
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
