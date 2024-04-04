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
import CartView from '../views/User/CartView.vue'
import CheckoutView from '../views/User/CheckoutView.vue'
import OrderListView from '../views/User/OrderListView.vue'
import AdvertisementItemView from '../views/AdvertisementItemView.vue'

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
      {
        path: 'wishlist/',
        name: 'wishlist',
        component: WishlistView
      },
      {
        path: 'cart/',
        name: 'cart',
        component: CartView
      },
      {
        path: 'checkout/',
        name: 'checkout',
        component: CheckoutView
      },
      {
        path: 'order-list/',
        name: 'userOrderList',
        component: OrderListView
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
    path: '/advertisement/:id/',
    name: 'advertisement',
    component: AdvertisementItemView
  },
  {
    path: '/contact/',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/compare/',
    name: 'compare',
    component: CompareView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
