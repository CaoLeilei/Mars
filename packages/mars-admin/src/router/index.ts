import type { App } from 'vue'

import {createRouter, createWebHashHistory} from 'vue-router'
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

// 创建标准的内容
export function setupRouter(app: App) {
  app.use(router)
}
export default router
