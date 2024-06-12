<template>
    <div class="pagination_wrap">
        <ul v-if="goods_list_loading" class="pagination_nav ul_li_right">
            <li><a></a></li>
            <li><a></a></li>
            <li><a></a></li>
            <li><a></a></li>
            <li><a></a></li>
            <li><a></a></li>
            <li><a></a></li>
            <li><a></a></li>
        </ul>
        <ul v-else-if="goodsQty < 1" class="pagination_nav ul_li_right">
        </ul>
        <ul v-else class="pagination_nav ul_li_right">
            <li v-if="currentPage > 3">
            <router-link v-if="q" :to="{ name: 'catalog', query: {q:q, page:1} }">1</router-link>
            <router-link v-else-if="categoryId" :to="{ name: 'category', query: { page:1} }">1</router-link>
            <router-link v-else :to="{ name: 'catalog', query: { page:1} }">1</router-link>
            </li>
            <li 
                v-for="item in availablePagesBeforeCurrent" 
                v-bind:key="item.id" 
                >
                <router-link v-if="q" :to="{ name: 'catalog', query: {q:q, page:item} }">{{ item }}</router-link>
                <router-link v-else-if="categoryId" :to="{ name: 'category', query: { page:item} }">{{ item }}</router-link>
                <router-link v-else :to="{ name: 'catalog', query: { page:item} }">{{ item }}</router-link>
            </li>
            <li
                class="active"
                >
                <router-link v-if="q" :to="{ name: 'catalog', query: {q:q, page:currentPage} }">{{ currentPage }}</router-link>
                <router-link v-else-if="categoryId" :to="{ name: 'category', query: { page:currentPage} }">{{ currentPage }}</router-link>
                <router-link v-else :to="{ name: 'catalog', query: { page:currentPage} }">{{ currentPage }}</router-link>
            </li>
            <li 
                v-for="item in availablePagesAfterCurrent" 
                v-bind:key="item.id" 
                >
                <router-link v-if="q" :to="{ name: 'catalog', query: {q:q, page:item} }">{{ item }}</router-link>
                <router-link v-else-if="categoryId" :to="{ name: 'category', query: { page:item} }">{{ item }}</router-link>
                <router-link v-else :to="{ name: 'catalog', query: { page:item} }">{{ item }}</router-link>
            </li>
            <li v-if="(pageQty-currentPage) > 2">
                <router-link v-if="q" :to="{ name: 'catalog', query: {q:q, page:pageQty} }">{{ pageQty }}</router-link>
                <router-link v-else-if="categoryId" :to="{ name: 'category', query: { page:pageQty} }">{{ pageQty }}</router-link>
                <router-link v-else :to="{ name: 'catalog', query: { page:pageQty} }">{{ pageQty }}</router-link>
            </li>

            <li class="prev_btn">
                <a href="#" @click="previosPage">
                    <i class="fa-regular fa-angle-left"></i>
                </a>
            </li>    
            <li class="next_btn">
                <a href="#" @click="nextPage">
                    <i  class="fa-regular fa-angle-right"></i>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { useCookies } from "vue3-cookies"
export default {
    name: 'PaginationComponent',
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    computed: {
        userToken () {
            return this.$store.getters.user_token
        },
        q () {
            return this.$route.query.q
        },
        categoryId () {
            if (this.$route.name == "category") {
                return this.$route.params.id
            }
            return ""
        },
        goodsQty () {
            return this.getGoodsQty()
        },
        pageQty () {
            return this.getPageQty()
        },
        currentPage () {
            return this.getCurrentPage()
        },
        goods_list_loading () {
            return this.goodsListLoadingStatus()
        },
        availablePagesBeforeCurrent () {
            return this.getAvailablePagesBeforeCurrent()
        },
        availablePagesAfterCurrent () {
            return this.getAvailablePagesAfterCurrent()
        },
    },
    mounted() {
    },
    methods: {
        getAvailablePagesBeforeCurrent () {
            return this.$store.getters.availablePagesBeforeCurrent
        },
        getAvailablePagesAfterCurrent () {
            return this.$store.getters.availablePagesAfterCurrent
        },
        goodsListLoadingStatus () {
            return this.$store.getters.goods_list_loading
        },
        getPageQty () {
            return this.$store.getters.page_qty
        },
        getGoodsQty: function() {
            return this.$store.getters.goods_qty
        },
        getCurrentPage () {
            return this.$store.getters.current_page
        }, 
        setCurrentPage (page_num) {
            if (!this.$route.query.page == '') {
                this.$store.dispatch('setCurrentPage', page_num)
            } else {
                this.$store.dispatch('setCurrentPage', 1)
            }
        },
        loadCurrentGoodsList(page) {
            let data = {
                page: page
            }
            if (this.$route.name == "category") {
                data["category_id"] = this.$route.params.id
            }
            if (this.$route.query.q) {
                data["q"] = this.$route.query.q
            }
            let authToken = this.cookies.get("avtobm21_token") 
            if (authToken) {
                data["authToken"] = authToken
            } else if (this.userToken) {
                data["authToken"] = this.userToken
            }
            this.$store.dispatch('getGoodsList', data)  
        },
        nextPage: function(el) {
            el.preventDefault()
            if (this.goods_list_loading == false) {
                if (!(this.currentPage == this.pageQty)) {
                    this.setCurrentPage(this.currentPage + 1)
                    this.loadCurrentGoodsList(this.currentPage)
                    if (this.q) {
                        this.$router.push({ name: 'catalog', query: { q:this.q, page:this.currentPage } })
                    } else if (this.categoryId) {
                        this.$router.push({ name: 'category', query: { page:this.currentPage } })
                    } else {
                        this.$router.push({ name: 'catalog', query: { page:this.currentPage } })
                    }
                }    
            }
        },
        previosPage: function(el) {
            el.preventDefault()
            if (this.goods_list_loading == false) {
                if (this.currentPage > 1) {
                    this.setCurrentPage(this.currentPage - 1)
                    this.loadCurrentGoodsList(this.currentPage)
                    if (this.q) {
                        this.$router.push({ name: 'catalog', query: { q:this.q, page:this.currentPage } })
                    } else if (this.categoryId) {
                        this.$router.push({ name: 'category', query: { page:this.currentPage } })
                    } else {
                        this.$router.push({ name: 'catalog', query: { page:this.currentPage } })
                    }
                }
            }    
        },
    },
    watch: {
        '$route.query': {
            immediate: true,
            handler() {
                if (!this.$route.query.page == '') {
                    this.setCurrentPage(parseInt(this.$route.query.page))
                } else {
                    this.setCurrentPage(1)
                }
                this.loadCurrentGoodsList(this.currentPage)
            },
        },
    },

}
</script>