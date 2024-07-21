import vue from '@vitejs/plugin-vue'
import progress from 'vite-plugin-progress'
import html from './html'
import compress from './compress'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins (viteEnv) {
  const plugins = [
    vue(),
    vueSetupExtend(),
    progress(),
    html(viteEnv),
    // vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router'],
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
    }),
  ]

  if (viteEnv.VITE_COMPRESS === 'Y') {
    plugins.push(compress(viteEnv))
  }

  return plugins
}
