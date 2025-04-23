import type { CreateAdherentCommand } from '@/features/adherents/createAdherent/createAdherent.usecase.ts'
import type { AdherentRepository } from '@/features/adherents/infrastructure/IAdherent.repository.ts'

export class FakeAdherentRepository implements AdherentRepository {
  private adherentData: (CreateAdherentCommand & { id: number })[] = [];

  async create(adherent: CreateAdherentCommand): Promise<{ lastName: string; id: number }> {
    const newEntry = {
      id: this.adherentData.length + 1,
      ...adherent
    };

    this.adherentData.push(newEntry);

    // Retourne explicitement les champs demandés
    return {
      lastName: newEntry.lastName,
      id: newEntry.id
    };
  }

  async findAll(): Promise<Array<CreateAdherentCommand & { id: number }>> {
    return [...this.adherentData];
  }

  async findById(id: number): Promise<(CreateAdherentCommand & { id: number }) | null> {
    return this.adherentData.find((adherent) => adherent.id === id) || null;
  }

  async update(id: number, updatedData: CreateAdherentCommand): Promise<CreateAdherentCommand | null> {
    const index = this.adherentData.findIndex((adherent) => adherent.id === id);

    if (index === -1) return null;

    this.adherentData[index] = {
      ...this.adherentData[index],
      ...updatedData
    };

    return this.adherentData[index];
  }

  async delete(id: number): Promise<number | null> {
    const index = this.adherentData.findIndex((adherent) => adherent.id === id);

    if (index === -1) return null;

    this.adherentData.splice(index, 1);
    return id;
  }
}
