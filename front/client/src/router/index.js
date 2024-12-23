import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage'

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: () => import('../views/SignupPage.vue') 
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomePage.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
