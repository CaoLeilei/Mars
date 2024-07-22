import { defineStore } from 'pinia'

export interface IUserState {
}

export const useUserStore = defineStore('GlobalStore', {
  state: (): IUserState => ({
  }),
  actions: {}
})