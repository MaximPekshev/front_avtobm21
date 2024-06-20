<template>
    <div class="body_wrap">
        <BackToTop />
        <PreloaderComponent v-if="cart_loading || loading"/>
        <HeaderComponent />
        <main>
          <DefaultBreadCrumbs pageName="Оформление заказа" />
            <section v-if="orderUploadedSeccus" class="checkout_section mt-4">
                <div class="row justify-content-center">
                <div class="col">
                    <div class="team_section_title text-center">
                        <h2 class="title_text mb-4">Заказ успешно размещен</h2>
                        <router-link :to="{ name: 'catalog', query:{page:1}}" class="btn btn_primary m-2 p-3">В Каталог</router-link>
                        <router-link :to="{ name: 'userOrderList'}" class="btn btn_primary m-2 p-3">Мои Заказы</router-link>
                    </div>
                </div>
                </div>
            </section>
            <section v-else class="checkout_section mt-4">
                <div class="container">
                    <div class="checkout_widget bg-light">
                        <h3 class="checkout_widget_title">Детали заказа</h3>
                        <div class="form_item">
                            <h4 class="input_title">Контрагент</h4>
                            <input readonly type="text" :value="actualCustomer">
                        </div>
                        <div class="select_option clearfix">
                            <h4 class="input_title">Договор</h4>
                            <VueSelect
                                v-model="selectedContractId"
                                :options="selectContracts"
                                :isClearable="false"
                                @option-selected="(option) => loadContracts(option.value)"
                                placeholder="Выберите договор"
                            >
                                <template #option="{ option }">
                                    {{ option.label }}
                                </template>
                            </VueSelect>
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
                                :goodsPrice="item.price"
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

import { ref } from "vue";
import "vue3-select-component/dist/style.css";
import VueSelect from "vue3-select-component";

export default {
  name: 'CheckoutView',
  setup() {
    const { cookies } = useCookies()
    return { cookies }
    },
  data () {
    return {
        loading: false,
        selectedContractId: ref(""),
        orderUploadedSeccus: false
    }
  },  
  components: {
    HeaderComponent,
    BackToTop,
    FooterComponent,
    DefaultBreadCrumbs,
    PreloaderComponent,
    CheckoutItemComponentVue,
    VueSelect
  },
  computed: {
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
    selectContracts () {
        let contracts = []
        this.contracts.forEach(contract => {
            contracts.push({
                label: `${contract.name} ${contract.number} от ${contract.date}`,
                value: contract.id
            })
        })
        return contracts
    },
    contracts () {
        return this.$store.getters.contracts
    },
    actualCustomer () {
        let actualCustomer = this.$store.getters.actualCustomer
        return `${actualCustomer.name}, ИНН: ${actualCustomer.inn}`
    },

    actualContract () {
        return this.$store.getters.actualContract
    }
  },
  mounted() {
    this.loadContracts()
  },
  methods: {
    placeAnOrder () {
        if (this.selectedContractId && this.actualCustomer && this.cartQty > 0) {
            this.loading = true
            this.$store.dispatch('placeAnOrder', 
            {   
                contract_id: this.selectedContractId,
                cart: this.cart,
                authToken: this.userToken,
            }).then(() => {
                this.$store.dispatch('deleteAllCartItems', this.userToken)
            }).finally(() => {
                this.orderUploadedSeccus = true
                this.loading = false
            })
        }
    },
    loadContracts (id) {
        let authToken = this.cookies.get("avtobm21_token") 
        let data = {}
        if (authToken) {
            data.authToken = authToken
        } else if (this.userToken) {
            data.authToken = this.userToken
        }
        if (id) { data.id = id }
        this.$store.dispatch('loadContracts', data).then (() => {
            this.selectedContractId = ref(`${this.actualContract.id}`)
        })
    }
  },
  watch: {
    '$route': {
        immediate: true,
        handler() {
            document.title = 'Оформление заказа'
            this.loadContracts()
        }
    },
  } 
}
</script>


<style scoped>
:deep(.vue-select) {
    --vs-padding: 0.7rem 20px;
    --vs-border: 1px solid #ededed;
    --vs-border-radius: 3px;
}

</style>