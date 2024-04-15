<template>
    <PreloaderComponent v-if="orderInfoLoading"/>
    <div class="breadcrumb_section">
        <div class="container">
            <ul class="breadcrumb_nav ul_li">
                <li><router-link to="/">Домой</router-link></li>
                <li><router-link :to="{ name: 'userOrderList' }">Список заказов</router-link></li>
                <li v-if="orderInfoLoading"><div class="wl-demo"></div></li>
                <li v-else>Заказ #{{ order.number }} от {{ order.date }}</li>
            </ul>
        </div>
    </div>
    <section class="account_section section_space">
        <div class="container">
            <div class="row">
                <div class="col col-lg-3">
                    <div class="account_menu">
                        <h2 class="title_text"></h2>
                        <ul class="account_menu_list ul_li_block">
                            <li><router-link :to="{ name: 'userAccount' }">Учетная запись</router-link></li>
                            <li><router-link :to="{ name: 'userOrderList' }">Заказы</router-link></li>
                        </ul>
                    </div>
                </div>
                <div class="col col-lg-9">
                    <div class="account_content_area">
                        <h3 v-if="orderInfoLoading"><div class="wl-demo"></div></h3>
                        <h3 v-else>Заказ #{{ order.number }} от {{ order.date }}</h3>
                        <div class="cart_table checkout_table">
                            <div class="cart_table">
                                <table class="table mb-0">
                                    <thead>
                                        <tr>
                                            <th width="60%">Товар</th>
                                            <th class="text-center">Цена</th>
                                            <th class="text-center">Кол-во</th>
                                            <th class="text-center">Сумма</th>
                                        </tr>
                                    </thead>
                                    <OrderListItemDemoContent
                                        v-if="orderInfoLoading"
                                        :demoContent="order.items"
                                    ></OrderListItemDemoContent>
                                    <tbody v-else>
                                        <tr v-for="item in order.items" v-bind:key="item.id">
                                            <OrderItemComponent
                                                :orderItem="item"
                                            ></OrderItemComponent>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>Итого</td>
                                            <td>{{  Math.floor(orderAmount).toLocaleString() }} &#8381;</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { useCookies } from "vue3-cookies"
import PreloaderComponent from '@/components/PreloaderComponent.vue'
import OrderListItemDemoContent from '@/components/User/Order/OrderListItemDemoContent.vue'
import OrderItemComponent from '@/components/User/Order/OrderItemComponent.vue'
export default {
    name: "OrderListItemContentComponent",
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    components: {
        PreloaderComponent,
        OrderListItemDemoContent,
        OrderItemComponent
    },
    computed: {
        userToken () {
            return this.$store.getters.user_token
        },
        order () {
            return this.$store.getters.order
        },
        orderAmount () {
            return (this.$store.getters.orderAmount).toFixed(2)
        },
        orderInfoLoading () {
            return this.$store.getters.order_info_loading
        }
    },
    mounted () {
        this.loadOrderInfo(this.$route.params.id)
    },
    methods: {
        loadOrderInfo (orderId) {
            let authToken = this.cookies.get("avtobm21_token") 
            if (authToken) {
                this.$store.dispatch('loadOrderInfo', { authToken: authToken, id: orderId })
            } else if (this.userToken) {
                this.$store.dispatch('loadOrderInfo', { authToken: this.userToken, id: orderId })
            }
        }
    },
    watch: {
        '$route': {
            immediate: true,
            handler() {
                if (this.cookies.get("avtobm21_token")) {
                    this.loadOrderInfo(this.$route.params.id)
                }
            }
        },
        order: {
            deep: true,
            handler() {
                document.title = `Заказ #${this.order.number} от ${this.order.date}`
            }
        }
    }   
}
</script>