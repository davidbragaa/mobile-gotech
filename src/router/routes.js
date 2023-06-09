const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [

      { path: '', name: 'LoginDefault', component: () => import('pages/Login.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', name: 'register', component: () => import('pages/Register.vue') },
      { path: 'email-confirmatios', name: 'email-confirmatios', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'me', name: 'me', component: () => import('pages/Me.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [

      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
