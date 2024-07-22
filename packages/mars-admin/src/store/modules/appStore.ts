import { defineStore } from 'pinia'

export interface IAppState {
}

export const useAppStore = defineStore('GlobalStore', {
  state: (): IAppState => ({
  }),
  actions: {}
})