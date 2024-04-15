<template>
    <div class="body_wrap">
        <BackToTop />
        <PreloaderComponent v-if="cart_loading || loading"/>
        <HeaderComponent />
        <main>
          <DefaultBreadCrumbs pageName="Оформление заказа" />
            <section class="checkout_section mt-4">
                <div class="container">
                    <div class="checkout_widget bg-light">
                        <h3 class="checkout_widget_title">Детали заказа</h3>
                        <div class="form_item">
                            <h4 class="input_title">Контрагент</h4>
                            <input readonly type="text" :value="customer">
                        </div>
                        <div class="select_option clearfix">
                            <h4 class="input_title">Договор</h4>
                            <!-- <select style="display: none;">
                                <option data-display="Select Your Country">Select Your Option</option>
                                <option value="1" selected="">United Kingdom (UK)</option>
                                <option value="2">United Kingdom (UK)</option>
                                <option value="3">United Kingdom (UK)</option>
                                <option value="4">United Kingdom (UK)</option>
                                <option value="5">United Kingdom (UK)</option>
                            </select> -->
                            <div class="nice-select" tabindex="0">
                                <span v-if="contract" class="current">{{ contract.name }} {{ contract.number }} от {{ contract.date }}</span>
                                <!-- <ul class="list">
                                    <li data-value="1" class="option selected">United Kingdom (UK)</li>
                                    <li data-value="2" class="option">United Kingdom (1)</li>
                                    <li data-value="3" class="option">United Kingdom (2)</li>
                                    <li data-value="4" class="option">United Kingdom (3)</li>
                                    <li data-value="5" class="option">United Kingdom (4)</li>
                                </ul> -->
                            </div>
                        </div>
                    </div>
                    <div class="checkout_widget">
                        <h3 class="checkout_widget_title">Заказ</h3>
                        <div class="cart_table checkout_table">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Товар</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Сумма</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in cart" v-bind:key="item.id">
                                <CheckoutItemComponentVue 
                                :goodInfo="item.good"
                                :quantity="Number(item.quantity)"
                                >
                                </CheckoutItemComponentVue>  
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td><strong>Итого</strong></td>
                                <td nowrap><strong class="total_text">{{  Math.floor(cartAmount).toLocaleString() }} &#8381;</strong></td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div class="checkout_payment_method">
                        <div class="load_more">
                            <button @click="placeAnOrder" class="btn btn_primary w-100">Разместить заказ</button>
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
import CheckoutItemComponentVue from '@/components/User/Checkout/CheckoutItemComponent.vue'

export default {
  name: 'CheckoutView',
  setup() {
    const { cookies } = useCookies()
    return { cookies }
    },
  data () {
    return {
        loading: false,
    }
  },  
  components: {
    HeaderComponent,
    BackToTop,
    FooterComponent,
    DefaultBreadCrumbs,
    PreloaderComponent,
    CheckoutItemComponentVue
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    userToken () {
        return this.$store.getters.user_token
    },
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
    },
    contracts_loading () {
        return this.$store.getters.contracts_loading
    },
    contract () {
        return this.$store.getters.contracts[0]
    },
    customer () {
        if (this.contract) {
            return `${this.contract.customer.name}, ИНН: ${this.contract.customer.inn}`
        }
        return ''
    }
  },
  methods: {
    loadOrdersList () {
      let authToken = this.cookies.get("avtobm21_token") 
      if (authToken) {
          this.$store.dispatch('loadOrdersList', authToken)
      } else if (this.userToken) {
          this.$store.dispatch('loadOrdersList', this.userToken)
      }
    },
    placeAnOrder () {
        if (this.contract && this.customer && this.cartQty > 0) {
            this.loading = true
            setTimeout(() => {
                this.$store.dispatch('placeAnOrder', 
                {   
                    contract_id: this.contract.id,
                    cart: this.cart,
                    authToken: this.userToken,
                }).then(() => {
                    this.loadOrdersList()
                    this.$store.dispatch('deleteAllItems', this.userToken)
                    this.$router.push({ name: 'userAccount' })
                })
                this.loading = false
            }, 100)
        }
    }
  },
  watch: {
    '$route': {
        immediate: true,
        handler() {
            document.title = 'Оформление заказа'
        }
    },
  } 
}
</script>