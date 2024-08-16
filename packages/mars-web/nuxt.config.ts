// 导入必要的类型定义（如果有的话）
// import type { NuxtConfig, ConfigLayerMeta } from 'nuxt/schema';

// // 扩展 InputConfig 类型以包含 elementPlus 配置
declare module 'nuxt/schema' {
  interface InputConfig<NuxtConfig, ConfigLayerMeta> {
    elementPlus?: any;
    lodash?: any;
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@element-plus/nuxt", "@pinia/nuxt", "dayjs-nuxt", "nuxt-lodash"],
  plugins: [
    '~/plugins/element-plus-icon.ts',
  ],
  elementPlus: { /** Options */ },
  lodash: {
    prefix: "_",
    prefixSkip: ["string"],
    upperAfterPrefix: false,
    exclude: ["map"],
    alias: [
      ["camelCase", "stringToCamelCase"], // => stringToCamelCase
      ["kebabCase", "stringToKebab"], // => stringToKebab
      ["isDate", "isLodashDate"], // => _isLodashDate
    ],
  },
  css: ['~/assets/styles/main.css'],
})