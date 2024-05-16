<template>
    <div class="mt-3">
        <ul v-if="ordersListLoading" class="pagination_nav ul_li_right">
            <li><a></a></li>
            <li><a></a></li>
            <li><a></a></li>
            <li><a></a></li>
            <li><a></a></li>
            <li><a></a></li>
            <li><a></a></li>
            <li><a></a></li>
        </ul>
        <ul v-else-if="ordersQty < 1" class="pagination_nav ul_li_right">
        </ul>
        <ul v-else class="pagination_nav ul_li_right">
            <li v-if="currentPage > 3">
                <router-link :to="{ name: 'userOrderList', query: { page:1} }">1</router-link>
            </li>
            <li 
                v-for="item in orderAvailPagesBeforeCurrent" 
                v-bind:key="item.id" 
                >
                <router-link :to="{ name: 'userOrderList', query: { page:item} }">{{ item }}</router-link>
            </li>
            <li
                class="active"
                >
                <router-link :to="{ name: 'userOrderList', query: { page:currentPage} }">{{ currentPage }}</router-link>
            </li>
            <li 
                v-for="item in orderAvailPagesAfterCurrent" 
                v-bind:key="item.id" 
                >
                <router-link :to="{ name: 'userOrderList', query: { page:item} }">{{ item }}</router-link>
            </li>
            <li v-if="(pageQty-currentPage) > 2">
                <router-link :to="{ name: 'userOrderList', query: { page:pageQty} }">{{ pageQty }}</router-link>
            </li>
            <li class="prev_btn">
                <a href="#" @click="previosPage"><i class="fa-regular fa-angle-left"></i></a>
            </li>
            <li class="next_btn">
                <a href="#" @click="nextPage"><i class="fa-regular fa-angle-right"></i></a>
            </li>
        </ul>
    </div>
</template>

<script>
import { useCookies } from "vue3-cookies"
export default {
    name: "OrderListPaginationComponent",
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    computed: {
        ordersListLoading () {
            return this.$store.getters.ordersListLoading
        },
        ordersQty () {
            return this.$store.getters.orderListQty
        },
        pageQty () {
            return this.$store.getters.pageQty
        },
        currentPage () {
            return this.$store.getters.currentPage
        },
        orderAvailPagesBeforeCurrent () {
            return this.$store.getters.orderAvailPagesBeforeCurrent
        },
        orderAvailPagesAfterCurrent () {
            return this.$store.getters.orderAvailPagesAfterCurrent
        },
    },
    methods: {
        loadOrdersList (page) {
            let authToken = this.cookies.get("avtobm21_token") 
            if (authToken) {
                this.$store.dispatch('loadOrdersList', { authToken: authToken, page: page })
            } else if (this.userToken) {
                this.$store.dispatch('loadOrdersList', { authToken: this.userToken, page: page })
            }
        },
        setCurrentPage (page_num) {
            // console.log(page_num)
            if (!this.$route.query.page == '') {
                this.$store.dispatch('setCurrentPage', page_num)
            } else {
                this.$store.dispatch('setCurrentPage', 1)
            }
        },
        nextPage: function(el) {
            el.preventDefault()
            if (!this.ordersListLoading) {
                if (!(this.currentPage == this.pageQty)) {
                    this.setCurrentPage(this.currentPage + 1)
                    this.loadOrdersList(this.currentPage)
                    this.$router.push({ name: 'userOrderList', query: { page:this.currentPage} })
                }    
            }
        },
        previosPage: function(el) {
            el.preventDefault()
            if (!this.ordersListLoading) {
                if (this.currentPage > 1) {
                    this.setCurrentPage(this.currentPage - 1)
                    this.loadOrdersList(this.currentPage)
                    this.$router.push({ name: 'userOrderList', query: { page:this.currentPage } })
                }
            }    
        }
    },
    watch: {
        '$route.query': {
            immediate: true,
            handler() {
                document.title = 'Список заказов'
                if (this.cookies.get("avtobm21_token")) {
                    if (!this.$route.query.page == '') {
                        this.setCurrentPage(parseInt(this.$route.query.page))
                    } else {
                        this.setCurrentPage(1)
                    }
                    this.loadOrdersList(this.currentPage)
                }
            }
        },
    }
}
</script>