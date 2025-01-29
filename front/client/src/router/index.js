import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage'
import store from '../store/store.js';

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
    component: () => import('../views/HomePage.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: "/gallery",
    name: 'GalleryPage',
    component: () => import('../views/GalleryPage.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: "/aboutus",
    name: 'AboutusPage',
    component: () => import('../views/AboutusPage.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: "/addAnimal",
    name: 'AddAnimalPage',
    component: () => import('../views/AddAnimalPage.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/animal/:id',
    name: 'AnimalDetailsPage',
    component: () => import('../views/AnimalDetailsPage.vue'),
    meta: { requiresAuth: true}
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to,from,next) => {
  if(to.meta.requiresAuth && !store.getters.isAuthenticated){
    next('/');
    return;
  }

  next();
})

export default router
