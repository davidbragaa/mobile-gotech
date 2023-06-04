const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'LoginPage', component: () => import('src/pages/LoginPage.vue') },
      { path: '', name: 'HomePage', component: () => import('src/pages/HomePage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
