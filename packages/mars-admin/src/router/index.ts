import type { App } from 'vue'
import { isUndefined } from 'lodash'
import {createRouter, createWebHashHistory} from 'vue-router'
import { useUserStore } from '@/store'
import AuthRoute from './routes/Auth'
import HomeRoute from './routes/Home'
import WorkspaceRoute from './routes/Workspace'
import Editor from './routes/Editor'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    HomeRoute,
    AuthRoute,
    WorkspaceRoute,
    Editor,
  ], // `routes: routes` 的缩写
})

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

// 创建标准的内容
export function setupRouter(app: App) {
  app.use(router)
}
export default router
