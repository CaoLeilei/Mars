const HomeRoute = {
  name: 'Home',
  path: '/',
  redirect: '/workspace',
  // redirect: '/workspace',
  component: () => import('@/views/Home/index.vue'),
  meta: {
    title: '',
  }
}

export default HomeRoute
