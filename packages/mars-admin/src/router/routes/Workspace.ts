// const WorkspaceLayout from
const WorkspaceRoute = {
  name: 'Workspace',
  path: '/workspace',
  redirect: '/workspace/projects',
  component: () => import('@/views/Workspace/index.vue'),
  meta: {
    title: '工作台',
  },
  children: [
    {
      name: 'WorkspaceProjects',
      path: '/workspace/projects',
      component: () => import('@/views/Workspace/Projects/index.vue'),
      meta: {
        title: '项目列表',
      }
    }
  ]
}

export default WorkspaceRoute
