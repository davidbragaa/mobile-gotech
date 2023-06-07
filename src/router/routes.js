import LoginPage from 'pages/LoginPage.vue'
import Homepage from 'pages/HomePage.vue'

const routes = [
  {
    path: '/',
    component: () => import('src/layout/LoginLayout.vue'),
    children: [

      { path: '', name: 'LoginDefault', component: LoginPage },
      { path: 'LoginPage', name: 'LoginPage', component: LoginPage }
    ]
  },
  {
    path: '/',
    component: () => import('src/pages/LoginPage.vue'),
    children: [

      { path: '', name: 'LoginPage', component: LoginPage },
      { path: '', name: 'HomePage', component: Homepage }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
