<template>
  <div class="body_wrap">
      <BackToTop />
      <PreloaderComponent v-if="cart_loading" />
      <HeaderComponent />
      <main>
        <DefaultBreadCrumbs pageName="Корзина" />
        <CartDemoComponent v-if="cart_loading" :demoCount="cartQty">
        </CartDemoComponent>
        <section class="cart_section section_space" v-else>
          <div class="container" v-if="cartQty > 0">
            <div class="cart_update_wrap">
              <!-- <p class="mb-0"><i class="fal fa-check-square"></i> Shipping costs updated.</p> -->
            </div>
            <div class="cart_table" >
              <table class="table">
                <thead>
                  <tr>
                    <th>Товар</th>
                    <th class="text-center">Цена</th>
                    <th class="text-center">Количество</th>
                    <th class="text-center">Сумма</th>
                    <th class="text-center">Удалить</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cart" v-bind:key="item.id">
                    <CartItemComponent 
                    :goodInfo="item.good"
                    :quantity="item.quantity"
                    >
                    </CartItemComponent>  
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="cart_btns_wrap">
              <div class="row justify-content-end">
                <div class="col col-lg-6">
                  <div class="cart_total_table">
                    <ul class="ul_li_block">
                      <li>
                        <span>Итого</span>
                        <span class="total_price text-end">{{  Math.floor(cartAmount).toLocaleString() }} &#8381;</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col mt-5">
                  <ul class="btns_group ul_li_right">
                    <li><router-link :to="{ name: 'checkout' }" class="btn btn_dark">Перейти к оформлению</router-link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="row justify-content-center">
              <div class="col">
                  <div class="team_section_title text-center">
                      <h2 class="title_text">Корзина пуста</h2>
                      <router-link :to="{ name: 'catalog', query:{page:1}}" class="btn btn_primary mt-4">В Каталог</router-link>
                  </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterComponent />
  </div>
</template>


<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import BackToTop from '@/components/BackToTop.vue'
import PreloaderComponent from '@/components/PreloaderComponent.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import DefaultBreadCrumbs from '@/components/DefaultBreadCrumbs.vue'
import product_img_11 from '@/assets/images/product_img_12.webp'
// import SideBarCartComponent from '@/components/SideBarCartComponent.vue'
import CartItemComponent from '@/components/User/Cart/CartItemComponent.vue'
import CartDemoComponent from '@/components/User/Cart/CartDemoComponent.vue'

export default {
    name: 'CartView',
    components: {
      HeaderComponent,
      BackToTop,
      FooterComponent,
      DefaultBreadCrumbs,
      // SideBarCartComponent
      PreloaderComponent,
      CartItemComponent,
      CartDemoComponent
    },
    data () {
        return {
          product_img_11,
        }
    },
    computed: {
      cart () {
        return this.$store.getters.cart
      },
      cartQty () {
        return this.$store.getters.cartQty
      },
      cart_loading () {
        return this.$store.getters.cart_loading
      },
      cartAmount () {
        return this.$store.getters.cartAmount.toFixed(2)
      }
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                document.title = 'Корзина'
            },
        },
    },
  }
  </script>