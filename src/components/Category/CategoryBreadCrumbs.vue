<template>
    <div class="breadcrumb_section">
        <div class="container">
            <ul class="breadcrumb_nav ul_li">
                <li><router-link to="/">Домой</router-link></li>
                <li>
                    <router-link 
                        :to="{ 
                            name: 'catalog', 
                            query: {page: 1}
                        }"
                    >
                    Каталог
                    </router-link>
                </li>
                <li v-if="category">{{ category.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CatalogBreadCrumbs',
    computed: {
        category () {
            return this.$store.getters.getCategoryById(this.$route.params.id)
        }
    },
}
</script>