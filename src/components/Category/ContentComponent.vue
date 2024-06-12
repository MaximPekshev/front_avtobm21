<template>
    <PreloaderComponent v-if="goods_list_loading" />
    <div class="tab-content">
        <div class="tab-pane fade show active" id="home" role="tabpanel">
            <div class="product_wrap" v-if="goods_list_loading">
                <ContentLoadingDemo />
            </div>
            <div class="" v-else-if="goodsQty < 1">
                <div class="row justify-content-center">
                    <div class="col">
                        <div class="team_section_title text-center">
                            <h2 class="title_text">В этой категории товаров не найдено</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product_wrap" v-else>
                <div class="product_layout1" v-for="item in goods_list" v-bind:key="item.id">
                    <GoodComponent
                    :goodInfo="item"
                    ></GoodComponent>
                </div>  
            </div>
            <PaginationComponent />
        </div>
        <router-view></router-view>
    </div>
</template>

<script>

import GoodComponent from '@/components/Catalog/GoodComponent.vue'
import PaginationComponent from '@/components/Catalog/PaginationComponent.vue'
import ContentLoadingDemo from '@/components/Catalog/ContentLoadingDemo.vue'
import PreloaderComponent from '@/components/PreloaderComponent.vue'

export default {
    name: 'ContentComponent',
    components: {
        GoodComponent,
        PaginationComponent,
        ContentLoadingDemo,
        PreloaderComponent
    },
    computed: {
        goodsQty: function() {
            return this.getGoodsQty()
        },
        goods_list: function() {
            return this.getGoodsList()
        },
        goods_list_loading: function() {
            return this.goodsListLoadingStatus()
        },
    },
    methods: {
        getGoodsList: function() {
            return this.$store.getters.goods_list
        },
        getGoodsQty: function() {
            return this.$store.getters.goods_qty
        },
        goodsListLoadingStatus: function() {
            return this.$store.getters.goods_list_loading
        },
    }
}
</script>