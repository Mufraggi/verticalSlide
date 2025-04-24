import type { CreateAdherentCommand } from '@/features/adherents/createAdherent/createAdherent.usecase.ts'

export interface AdherentRepository {
  create(command: CreateAdherentCommand): Promise<{ lastName: string; id: number }>
  findAll(): Promise<Array<CreateAdherentCommand & { id: number }>>
  findById(id: number): Promise<(CreateAdherentCommand & { id: number }) | null>
  update(id: number, updatedData: CreateAdherentCommand): Promise<CreateAdherentCommand | null>
  delete(id: number): Promise<number | null>
}
