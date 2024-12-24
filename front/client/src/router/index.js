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
  },
  {
    path: "/gallery",
    name: 'GalleryPage',
    component: () => import('../views/GalleryPage.vue')
  },
  {
    path: "/aboutus",
    name: 'AboutusPage',
    component: () => import('../views/AboutusPage.vue')
  },
  {
    path: "/addAnimal",
    name: 'AddAnimalPage',
    component: () => import('../views/AddAnimalPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
