import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export const ElementPlusIconsPlugin = {
  install(app: App) {
    // 注册全局的elementui 图标
    Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
      app.component(key, component)
    })
  }
}