<template>
    <!-- <SideBarCartComponent /> -->
    <div class="body_wrap">
        <BackToTop />
        <PreloaderComponent v-if="loading || userInfoLoading"/>
        <HeaderComponent />
        <main>
          <DefaultBreadCrumbs pageName="Личный кабинет" />
          <section class="account_section section_space">
            <div class="container">
              <div class="row">
                <div class="col col-lg-3">
                  <div class="account_menu">
                    <h2 class="title_text"></h2>
                    <ul class="account_menu_list ul_li_block">
                      <li class="active"><router-link :to="{ name: 'userAccount' }">Учетная запись</router-link></li>
                      <li><router-link :to="{ name: 'userOrderList' }">Заказы</router-link></li>
                      <!-- <li><a href="#!">Избранное</a></li> -->
                    </ul>
                  </div>
                </div>
                <div class="col col-lg-9">
                  <div class="account_content_area">
                    <h3>Учетная запись</h3>
                    <ul class="content_layout ul_li_block">
                      <li>
                        <h4>Учётные данные</h4>
                        <p class="mb-0">
                          {{ userInfo.username }}
                        </p>
                        <a class="mb-3" href="#!">{{ userInfo.email }}</a>
                        <ul class="btns_group ul_li_right">
                          <li><button class="btn btn_gray" @click="userLogout">Выйти</button></li>
                        </ul>
                      </li>
                    </ul>
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
import { useCookies } from "vue3-cookies"
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import BackToTop from '@/components/BackToTop.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import DefaultBreadCrumbs from '@/components/DefaultBreadCrumbs.vue'
import PreloaderComponent from '@/components/PreloaderComponent.vue'
// import SideBarCartComponent from '@/components/SideBarCartComponent.vue'

export default {
  name: 'UserLoginView',
  setup() {
      const { cookies } = useCookies()
      return { cookies }
  },
  components: {
    HeaderComponent,
    BackToTop,
    FooterComponent,
    DefaultBreadCrumbs,
    PreloaderComponent
    // SideBarCartComponent
  },
  data () {
    return {
      loading: false,
    }
  },
  computed: {
    userToken () {
      return this.$store.getters.user_token
    },
    userInfo () {
      return this.$store.getters.user
    },
    userInfoLoading () {
      return this.$store.getters.user_info_loading
    }
  },
  created() {
    if (!this.userInfo) {
      this.$router.push({ name: 'userLogin'})
    }
  },
  methods: {
    userLogout () {
      this.loading = true
      this.$store.dispatch('setUserToken', '')
      this.$store.dispatch('clearUserInfo', {})
      this.$store.dispatch('clearCart', {})
      this.$store.dispatch('clearWishlist', {})
      this.$store.dispatch('clearContracts', {})
      this.$store.dispatch('clearOrdersList', {})
      setTimeout(()=>{
        this.$router.push({ name: 'userLogin' })
      }, 1000);
    },
  },
  '$route': {
      immediate: true,
      handler() {
          document.title = 'Личный кабинет'
      }
  },
}
</script>