import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "./store";
import * as plugins from './plugins'
import "@/styles/index.scss";
import './index.css'

console.log('plugins', plugins)

const app = createApp(App);

Object.values(plugins).forEach(pluginItem => {
  app.use(pluginItem)
})
setupStore(app)
setupRouter(app)

// app.use(ElementPlus);
app.mount("#app");
