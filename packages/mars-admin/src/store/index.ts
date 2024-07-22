import type { App } from 'vue'
import { createPinia } from 'pinia'

export * from './globalStore'
export * from './modules'

export function setupStore(app: App) {
  const store = createPinia()
  app.use(store);
}