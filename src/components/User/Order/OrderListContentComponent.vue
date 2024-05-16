<template>
    <PreloaderComponent v-if="ordersListLoading"/>
    <div class="breadcrumb_section">
        <div class="container">
            <ul class="breadcrumb_nav ul_li">
                <li><router-link to="/">Домой</router-link></li>
                <li>Список заказов</li>
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
                            <li class="active"><router-link :to="{ name: 'userOrderList' }">Заказы</router-link></li>
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
                                <OrderListDemoContent
                                    v-if="ordersListLoading"
                                    :demoCount = "orderListQty"
                                ></OrderListDemoContent>
                                <tbody v-else>
                                    <tr v-for="item in ordersList" v-bind:key="item.id">
                                        <td>
                                            <div class="cart_product">
                                                <router-link :to="{ name: 'userOrderItem', params: { id: item.id }}">
                                                    <h3># {{ item.number }} от {{ item.date }} </h3>
                                                </router-link>
                                            </div>
                                        </td>
                                        <td><span class="price_text">{{ item.status.name }}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <OrderListPaginationComponent />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import PreloaderComponent from '@/components/PreloaderComponent.vue'
import OrderListDemoContent from '@/components/User/Order/OrderListDemoContent.vue'
import OrderListPaginationComponent from '@/components/User/Order/OrderListPaginationComponent.vue'
export default {
    name: "OrderListContentComponent",
    components: {
        PreloaderComponent,
        OrderListDemoContent,
        OrderListPaginationComponent
    },
    computed: {
        userToken () {
            return this.$store.getters.user_token
        },
        ordersList () {
            return this.$store.getters.ordersList
        },
        orderListQty () {
            return this.$store.getters.orderListQty
        },
        ordersListLoading () {
            return this.$store.getters.ordersListLoading
        }
    },
}
</script>