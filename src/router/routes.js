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
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/ResetPassword.vue') },
      { path: 'frequencia-public/:id', name: 'frequencia-public', component: () => import('pages/Frequency/Public.vue') }

    ]
  },
  {
    path: '/',
    component: () => import('src/layout/MainLayout.vue'),
    children: [

      { path: 'me', name: 'me', component: () => import('pages/Me.vue') },
      { path: 'aluno', name: 'aluno', component: () => import('pages/Aluno/List.vue') },
      { path: 'form-aluno/:id?', name: 'form-aluno', component: () => import('pages/Aluno/Form.vue') },
      { path: 'frequencia', name: 'frequencia', component: () => import('pages/Frequency/List.vue') },
      { path: 'form-frequencia/:id?', name: 'form-frequencia', component: () => import('pages/Frequency/Form.vue') },
      { path: 'qrcode', name: 'qrcode', component: () => import('pages/Frequency/QRcode.vue') },
      { path: 'disciplina', name: 'disciplina', component: () => import('pages/Disciplina/List.vue') },
      { path: 'form-disciplina/:id?', name: 'form-disciplina', component: () => import('pages/Disciplina/Form.vue') },
      { path: 'laboratorio', name: 'laboratorio', component: () => import('pages/Laboratorio/List.vue') },
      { path: 'camera', name: 'camera', component: () => import('pages/Camera/Camera.vue') }
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
