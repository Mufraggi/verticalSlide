import { defineStore } from 'pinia'
import type { CreateAdherentCommand } from '@/features/adherents/createAdherent/createAdherent.usecase.ts'

export const ListAdherentsStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

type AdherentsState = {
  data: (CreateAdherentCommand & { id: number })[]
  status: string
  error: string | null
}
export const useAdherentsStore = defineStore('adherents', {
  state: (): AdherentsState => ({
    data: [],
    status: ListAdherentsStatus.IDLE,
    error: null,
  }),

  getters: {
    isLoading: (state) => state.status === ListAdherentsStatus.LOADING,
    hasError: (state) => state.status === ListAdherentsStatus.ERROR,
    adherents: (state) => state.data,
  },

  actions: {
    startLoading() {
      this.status = ListAdherentsStatus.LOADING
    },

    setAdherents(payload: (CreateAdherentCommand & { id: number })[]) {
      this.data = payload
      this.status = ListAdherentsStatus.SUCCESS
    },

    setError(error: string) {
      this.error = error
      this.status = ListAdherentsStatus.ERROR
    },
  },
})
