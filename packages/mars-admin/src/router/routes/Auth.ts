import type { RouteRecordRaw } from 'vue-router'

const AuthRoute: RouteRecordRaw  = {
  name: 'Auth',
  path: '/auth',
  redirect: '/login',
  component: () => import('@/views/Auth/index.vue'),
  meta: {
    title: '',
  },
  children: [
    {
      name: 'AuthLogin',
      path: '/login',
      component: () => import('@/views/Auth/Login.vue'),
      meta: {
        title: '用户登录~',
      }
    }
  ]
}
export default AuthRoute