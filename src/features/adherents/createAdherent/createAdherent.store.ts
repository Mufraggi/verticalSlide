import { defineStore } from 'pinia'

export enum CreateAdherentStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const useCreateAdherentStore = defineStore('createAdherent', {
  state: () => ({
    status: CreateAdherentStatus.IDLE,
    error: null as string | null,
  }),

  actions: {
    start() {
      this.status = CreateAdherentStatus.LOADING
      this.error = null
    },
    success() {
      this.status = CreateAdherentStatus.SUCCESS
    },
    fail(error: string) {
      this.status = CreateAdherentStatus.ERROR
      this.error = error
    },
  },
})
