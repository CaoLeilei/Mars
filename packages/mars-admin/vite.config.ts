import path from 'path'
import { defineConfig, loadEnv } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { setupVitePlugins } from './build'

/**
 * 获取项目根路径
 * @descrition 末尾不带斜杠
 */
export function getRootPath() {
  return path.resolve(process.cwd())
}

/**
 * 获取项目src路径
 * @param srcName - src目录名称(默认: "src")
 * @descrition 末尾不带斜杠
 */
export function getSrcPath(srcName = 'src') {
  const rootPath = getRootPath()

  return `${rootPath}/${srcName}`
}


const pathSrc = path.resolve(__dirname, 'src')

const rootPath = getRootPath()
const srcPath = getSrcPath()

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd())
  return {
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
      },
    },
    define: { 'process.env': viteEnv },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`,
        },
      },
    },
    plugins: setupVitePlugins(viteEnv),
    server: {
      open: false,
      port: 5171,
      proxy: {
        "/WechatWebDev": {
          target: "https://dldir1.qq.com",
          changeOrigin: true, //是否跨域
          // rewrite: (path) => path.replace(/^\/mis/, ""), //因为后端接口有mis前缀，所以不需要替换
          // ws: true,                       //是否代理 websockets
          // secure: true, //是否https接口
        },
      },
    },
  }
})
