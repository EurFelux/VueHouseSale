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
  sell: {
    path: '/sell/:id',
    name: 'sell',
  },
  buy: {
    path: '/buy/:id',
    name: 'buy',
  },
  rent: {
    path: '/rent/:id',
    name: 'rent',
  },
  seek: {
    path: '/seek/:id',
    name: 'seek',
  },
  manage: {
    path: '/manage',
    name: 'manage',
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
      path: routesMap.sell.path,
      name: routesMap.sell.name,
      component: () => import('../views/InfoView.vue')
    },
    {
      path: routesMap.buy.path,
      name: routesMap.buy.name,
      component: () => import('../views/InfoView.vue')
    },
    {
      path: routesMap.rent.path,
      name: routesMap.rent.name,
      component: () => import('../views/InfoView.vue')
    },
    {
      path: routesMap.seek.path,
      name: routesMap.seek.name,
      component: () => import('../views/InfoView.vue')
    },
    {
      path: routesMap.manage.path,
      name: routesMap.manage.name,
      component: () => import('../views/ManageView.vue')
    },
    {
      path: routesMap.notFound.path,
      name: routesMap.notFound.name,
      component: () => import('../views/NotFoundView.vue')
    },
  ]
})

export default router