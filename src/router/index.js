import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogView from '../views/CatalogView.vue'
import ContactView from '../views/ContactView.vue'
import WishlistView from '../views/User/WishlistView.vue'
import GoodView from '../views/GoodView.vue'
import CategoryView from '../views/CategoryView.vue'
import UserLoginView from '../views/User/UserLoginView.vue'
import UserAccountView from '../views/User/UserAccountView.vue'
import CartView from '../views/User/CartView.vue'
import CheckoutView from '../views/User/CheckoutView.vue'
import OrderListView from '../views/User/Order/OrderListView.vue'
import OrderItemView from '../views/User/Order/OrderListItemView.vue'
import AdvertisementItemView from '../views/AdvertisementItemView.vue'
import NotFound from '../views/PageNotFound.vue'

const routes = [
  { 
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound },
  {
    path: '/',
    name: 'home',
    component: HomeView,
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
        path: 'orders/',
        children: [
          {
            path: 'list/',
            name: 'userOrderList',
            component: OrderListView
          },
          {
            path: ':id/',
            name: 'userOrderItem',
            component: OrderItemView
          },
        ]
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
