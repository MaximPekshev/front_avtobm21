<template>
    <aside class="sidebar_section ps-0 mt-lg-0">
        <div class="sb_widget sb_category">
            <h3 class="sb_widget_title">Категории</h3>
            <ul v-if="categoriesList" class="sb_category_list ul_li_block">
                <li 
                    v-for="item in categoriesList" 
                    v-bind:key="item.id"
                >
                    <router-link 
                        :to="{ 
                            name: 'category', 
                            params: { id: item.id }, 
                            query: {page: 1}
                        }"
                    >
                    {{ item.name }}
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
export default {
    name: 'SideBarComponent',
    computed: {
        categoriesList () {
            return this.getCategoryList()
        }
    },
    mounted() {
        this.loadCategoryList()
    },
    methods: {
        loadCategoryList () {
            this.$store.dispatch('loadCategoriesList')
        },
        getCategoryList() {
            return this.$store.getters.categories_list
        },
        // closeCategoryDropdown() {
        //     let allcategories_collapse = document.getElementById('allcategories_collapse')
        //     if (allcategories_collapse.classList.contains('show')) {
        //         allcategories_collapse.classList.remove('show')
        //     } else {
        //         allcategories_collapse.classList.remove('add')
        //     }
        // }
    },
    watch: {
        '$route.query': {
            immediate: true,
            handler() {
                this.loadCategoryList()
            },
        }
    },
}
</script>