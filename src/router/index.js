import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogView from '../views/CatalogView.vue'
import ContactView from '../views/ContactView.vue'
import CompareView from '../views/CompareView.vue'
import WishlistView from '../views/User/WishlistView.vue'
import GoodView from '../views/GoodView.vue'
import CategoryView from '../views/CategoryView.vue'
import UserLoginView from '../views/User/UserLoginView.vue'
import UserAccountView from '../views/User/UserAccountView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/user/',
    children: [
      {
        path: 'login/',
        name: 'userLogin',
        component: UserLoginView
      },
      {
        path: 'account/',
        name: 'userAccount',
        component: UserAccountView
      },
    ]
  },
  {
    path: '/catalog/',
    children: [
      {
        path: '',
        name: 'catalog',
        component: CatalogView
      },
      {
        path: 'good/:id/',
        name: 'good',
        component: GoodView
      },
      {
        path: 'category/:id/',
        name: 'category',
        component: CategoryView
      }
    ]
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/compare',
    name: 'compare',
    component: CompareView
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: WishlistView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
