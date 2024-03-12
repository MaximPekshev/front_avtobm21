<template>
    <!-- <SideBarCartComponent /> -->
    <div class="body_wrap">
        <BackToTop />
        <PreloaderComponent v-if="ordersListLoading"/>
        <HeaderComponent />
        <main>
          <DefaultBreadCrumbs pageName="Список заказов" />
          <section class="account_section section_space">
            <div class="container">
              <div class="row">
                <div class="col col-lg-3">
                  <div class="account_menu">
                    <h2 class="title_text"></h2>
                    <ul class="account_menu_list ul_li_block">
                      <li><router-link :to="{ name: 'userAccount' }">Учетная запись</router-link></li>
                      <li class="active"><router-link :to="{ name: 'userOrderList' }">Заказы</router-link></li>
                      <!-- <li><a href="#!">Избранное</a></li> -->
                    </ul>
                  </div>
                </div>
                <div class="col col-lg-9">
                  <div class="account_content_area">
                    <h3>Заказы</h3>
                    <div class="cart_table checkout_table">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Дата/номер</th>
                        <th>Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in ordersList" v-bind:key="item.id">
                        <td>
                          <div class="cart_product">
                            <h3># {{ item.number }} от {{ item.date }} </h3>
                          </div>
                        </td>
                        <td><span class="price_text">{{ item.status.name }}</span></td>
                      </tr>
                    </tbody>
                  </table>
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
import { useCookies } from "vue3-cookies"
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import BackToTop from '@/components/BackToTop.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import DefaultBreadCrumbs from '@/components/DefaultBreadCrumbs.vue'
import PreloaderComponent from '@/components/PreloaderComponent.vue'

export default {
  name: 'OrderListView',
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
    ordersList () {
        return this.$store.getters.ordersList
    },
    ordersListLoading () {
      return this.$store.getters.ordersListLoading
    }
  },
  mounted () {
    this.loadOrdersList()
  },
  methods: {
    loadOrdersList () {
      let authToken = this.cookies.get("avtobm21_token") 
      if (authToken) {
          this.$store.dispatch('loadOrdersList', authToken)
      } else if (this.userToken) {
          this.$store.dispatch('loadOrdersList', this.userToken)
      }
    }
  },
  '$route': {
      immediate: true,
      handler() {
          document.title = 'Список заказов'
          if (this.cookies.get("avtobm21_token")) {
            this.loadOrdersList()
          }
      }
  },
}
</script>