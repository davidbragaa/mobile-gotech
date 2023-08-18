const routes = [
  {
    path: '/',
    component: () => import('src/layout/LoginLayout.vue'),
    children: [

      { path: '', name: 'LoginDefault', component: () => import('pages/Login.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', name: 'register', component: () => import('pages/Register.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/ForgotPassword.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/ResetPassword.vue') }

    ]
  },
  {
    path: '/',
    component: () => import('src/layout/MainLayout.vue'),
    children: [

      { path: 'me', name: 'me', component: () => import('pages/Me.vue') }
      // { path: '', component: () => import('pages/Index.vue') }

    ],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
