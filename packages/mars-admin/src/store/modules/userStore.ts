import { defineStore } from 'pinia'

export interface IUserState {
  userInfo: any
  token?: string
}

export const useUserStore = defineStore('GlobalStore', {
  state: (): IUserState => ({
    userInfo: null,
    token: undefined,
  }),
  actions: {
    login(user: any) {
      this.userInfo = user
    },
    /**
     * 请求服务端接口进行获取当前用户的信息
     */
    async fetchUserInfo() {}
  }
})