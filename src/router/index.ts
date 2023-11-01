import { createRouter, createWebHistory } from 'vue-router'

export interface RouteType {
  path: string
  name: string
}

export const navRoutes: Record<string, RouteType> = {
  home: {
    path: '/',
    name: 'Home',
  },
  about: {
    path: '/about',
    name: 'About',
  },
}

export const routesMap: Record<string, RouteType> = {
  ...navRoutes,
  login: {
    path: '/login',
    name: 'Login',
  },
  register: {
    path: '/register',
    name: 'Sign Up',
  },
  user: {
    path: '/user/:id',
    name: 'user',
  },
  notFound: {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
  },
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routesMap.home.path,
      name: routesMap.home.name,
      component: () => import('../views/HomeView.vue')
    },
    {
      path: routesMap.about.path,
      name: routesMap.about.name,
      component: () => import('../views/AboutView.vue')
    },
    {
      path: routesMap.login.path,
      name: routesMap.login.name,
      component: () => import('../views/LoginView.vue')
    },
    {
      path: routesMap.register.path,
      name: routesMap.register.name,
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: routesMap.user.path,
      name: routesMap.user.name,
      component: () => import('../views/UserView.vue')
    },
    {
      path: routesMap.notFound.path,
      name: routesMap.notFound.name,
      component: () => import('../views/NotFoundView.vue')
    },
  ]
})

export default router