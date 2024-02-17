<template>
  <!-- <SideBarCartComponent /> -->
  <div class="body_wrap">
      <BackToTop />
      <PreloaderComponent v-if="wishlist_loading" />
      <HeaderComponent />
      <main>
        <DefaultBreadCrumbs pageName="Избранное" />
        <section class="cart_section section_space">
          <div class="container" v-if="wishlist_loading">
            <WishlistDemoComponent :demoCount="wishlistQty">
            </WishlistDemoComponent>  
          </div>  
          <div class="container" v-if="!wishlist_loading">
            <div class="cart_table" v-if="wishlistQty > 0">
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th>Товар</th>
                    <th class="text-center">Цена</th>
                    <th class="text-center">Наличие</th>
                    <th class="text-center">В корзину</th>
                    <th class="text-center">Удалить</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in wishlist" v-bind:key="item.id">
                    <WishlistItemComponent
                      :goodInfo="item.good"
                    ></WishlistItemComponent>
                  </tr>  
                </tbody>
              </table>
            </div>
            <div class="cart_table" v-else>
                <div class="row justify-content-center">
                    <div class="col">
                        <div class="team_section_title text-center">
                            <h2 class="title_text">В избранном нет товаров</h2>
                            <router-link :to="{ name: 'catalog', query:{page:1}}" class="btn btn_primary mt-4">В Каталог</router-link>
                        </div>
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
import WishlistItemComponent from '@/components/User/Wishlist/WishlistItemComponent.vue'
import WishlistDemoComponent from '@/components/User/Wishlist/WishlistDemoComponent.vue'
import product_img_11 from '@/assets/images/product_img_12.webp'
// import SideBarCartComponent from '@/components/SideBarCartComponent.vue'

export default {
  name: 'WishlistView',
  components: {
    HeaderComponent,
    BackToTop,
    FooterComponent,
    DefaultBreadCrumbs,
    WishlistItemComponent,
    WishlistDemoComponent,
    PreloaderComponent,
    // SideBarCartComponent
  },
  data () {
      return {
        product_img_11,
      }
  },
  computed: {
    wishlist () {
      return this.$store.getters.wishlist
    },
    wishlist_loading () {
      return this.$store.getters.wishlist_loading
    },
    wishlistQty () {
      return this.$store.getters.wishlistQty
    }
  },
  watch: {
      $route: {
          immediate: true,
          handler() {
              document.title = 'Избранное'
          },
      },
  },
}
</script>