<template>
    <header class="header_section">
       <HeaderTop />
        <div class="header_middle">
          <div class="container">
            <div class="row align-items-center">
              <div class="col col-lg-3 col-5">
                <LogoComponent />
              </div>
              <div class="col col-lg-6 col-2">
                <MainMenuComponent />
              </div>
              <div class="col col-lg-3 col-5">
                <ul class="header_icons_group ul_li_right">
                  <li>
                    <button class="mobile_menu_btn navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_menu_dropdown" aria-controls="main_menu_dropdown" aria-expanded="false" aria-label="Toggle navigation">
                      <i class="fal fa-bars"></i>
                    </button>
                  </li>
                  <li><router-link to="/contact"><i class="fa-regular fa-location-dot"></i></router-link></li>
                  <!-- <li><router-link to="/compare"><i class="fa-solid fa-arrows-rotate"></i></router-link></li> -->
                  <li v-if="user">
                    <router-link :to="{ name: 'wishlist'}">
                      <i class="fa-regular fa-heart"></i>
                      <small v-if="wishlistQty > 0" class="wishlist_counter">{{ wishlistQty }}</small>
                    </router-link>
                  </li>
                  <li v-if="user"><router-link :to="{ name: 'userAccount'}"><i class="fa-regular fa-user"></i></router-link></li>
                  <li v-else><router-link :to="{ name: 'userLogin'}"><i class="fa-regular fa-user"></i></router-link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="header_bottom">
          <div class="container">
            <div class="row align-items-center">
              <div class="col col-md-3 col-6">
                <!-- <AllCategoriesDropdown /> -->
              </div>
              <div class="col col-md-6">
                <SearchComponent />
              </div>
              <div class="col col-md-3 col-6">
                <CartComponent />
              </div>
            </div>
          </div>
        </div>
    </header>
 </template>
   
 <script>

import { useCookies } from "vue3-cookies"
import HeaderTop from '@/components/Header/HeaderTop.vue'
import LogoComponent from '@/components/Header/LogoComponent.vue'
import MainMenuComponent from '@/components/Header/MainMenuComponent.vue'
// import AllCategoriesDropdown from '@/components/Header/AllCategoriesDropdown.vue'
import SearchComponent from '@/components/Header/SearchComponent.vue'
import CartComponent from '@/components/Header/CartComponent.vue'

export default {
  
    name: 'HeaderComponent',
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    components: {
        HeaderTop,
        LogoComponent,
        MainMenuComponent,
        // AllCategoriesDropdown,
        SearchComponent,
        CartComponent
    },
    computed: {
      userToken () {
        return this.$store.getters.user_token
      },
      user () {
        return this.$store.getters.user
      },
      wishlistQty () {
        return this.$store.getters.wishlistQty
      },
    },
    mounted() {
      this.checkTheCookiesAuthToken()
      this.loadWishlist()
      this.loadContracts()
    },
    methods: {
      checkTheCookiesAuthToken () {
        let authToken = this.cookies.get("avtobm21_token")
        if (authToken) {
          this.$store.dispatch('setUserToken', authToken)
          this.$store.dispatch('loadUserInfo', authToken)
        }
      },
      loadWishlist () {
        let authToken = this.cookies.get("avtobm21_token") 
        if (authToken) {
          this.$store.dispatch('loadWishlist', authToken)
        } else if (this.userToken) {
          this.$store.dispatch('loadWishlist', this.userToken)
        }
      },
      loadContracts () {
        let authToken = this.cookies.get("avtobm21_token") 
        if (authToken) {
            this.$store.dispatch('loadContracts', authToken)
        } else if (this.userToken) {
            this.$store.dispatch('loadContracts', this.userToken)
        }
      }
    },
    watch: {
      userToken: {
        deep: true,
        handler() {
          if (this.userToken) {
            this.cookies.set('avtobm21_token', this.userToken)
            this.$store.dispatch('loadUserInfo', this.userToken)
          } else {
            this.cookies.remove('avtobm21_token')
            this.$store.dispatch('clearUserInfo', {})
          }
        }
      },
      '$route': {
        immediate: true,
        handler() {
          // this.cookies.set("avtobm21_token", "")
          if (this.cookies.get("avtobm21_token")) {
            this.loadWishlist()
            this.loadContracts()
          }
        },
      }
    }
}
</script>
 
<style scoped>
</style>