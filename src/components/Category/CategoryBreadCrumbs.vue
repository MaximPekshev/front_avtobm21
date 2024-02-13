<template>
    <div class="breadcrumb_section">
        <div class="container">
            <ul class="breadcrumb_nav ul_li">
                <li><router-link to="/">Домой</router-link></li>
                <li>Категории</li>
                <!-- <li>{{ name }}</li> -->
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CatalogBreadCrumbs',
    computed: {
        // name () {
        //     return this.getCategory().name
        // }
    },
    methods: {
        // getCategory() {
        //     console.log(this.$store.getters.getCategoryById(this.$route.params.id))
        //     return this.$store.getters.getCategoryById(this.$route.params.id)
        // },
        
    }
}
</script>