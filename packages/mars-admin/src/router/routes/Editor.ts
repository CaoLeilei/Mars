import type { RouteRecordRaw } from 'vue-router'

const EditorRoute: RouteRecordRaw  = {
  name: 'Editor',
  path: '/editor/:appId',
  component: () => import('~/views/Editor/index.vue'),
  meta: {
    title: '页面编辑器',
  },
}

export default EditorRoute