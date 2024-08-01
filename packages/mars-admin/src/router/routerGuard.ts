import type { Router } from 'vue-router'
import { isUndefined } from 'lodash'
import { useUserStore } from '@/store'

export const createRouterGuard = (router: Router) => {

  // 添加路由的前
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const needLogin = !to?.meta?.noLogin
    if (needLogin && !userStore.userInfo) {
      if (userStore.token) {
        await userStore.actions.fetchUserInfo()
        next()
      } else {
        next({
          name: 'AuthLogin',
        })
      }
    } else {
      next()
    }
    // console.log(to, from)
  })
}