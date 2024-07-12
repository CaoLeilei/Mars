import { defineStore } from 'pinia'

export interface GlobalState {
  appList: any[],
  appId: string, // 当前选中的app
}

export const useGlobalStore = defineStore('GlobalStore', {
  state: (): GlobalState => ({
    appList: [],
    appId: '',
  }),
  actions: {}
})