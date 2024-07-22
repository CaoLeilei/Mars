import { defineStore } from 'pinia'

export interface GlobalState {
}

export const useGlobalStore = defineStore('GlobalStore', {
  state: (): GlobalState => ({
  }),
  actions: {}
})