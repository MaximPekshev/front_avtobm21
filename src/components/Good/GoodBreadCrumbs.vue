<template>
    <div class="breadcrumb_section">
        <div class="container">
            <ul class="breadcrumb_nav ul_li">
                <li><router-link to="/">Домой</router-link></li>
                <li><router-link :to="{ name: 'catalog', query:{page:1}}">Каталог</router-link></li>
                <li>{{ goodsName }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GoodBreadCrumbs',
    props: [ "goodsName"],
    // computed: {
    //     goodInfo () {
    //         return this.getGoodInfo()
    //     },
    // },
    // methods: {
    //     getGoodInfo() {
    //         return this.$store.getters.goodInfo
    //     },
    // }
}
</script>