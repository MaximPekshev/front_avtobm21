<template>
    <div class="allcategories_dropdown">
        <button class="allcategories_btn" type="button" data-bs-toggle="collapse" data-bs-target="#allcategories_collapse" aria-expanded="false" aria-controls="allcategories_collapse">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="13" viewbox="0 0 15 13">
            <image width="15" height="13" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANAgMAAAALcNzSAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACVBMVEX+//3+//0AAABvRd2oAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQflBwIBIhVZ2fz2AAAAGUlEQVQI12MIDQ0NYQATaAAshEUcJgvVBgDy4QdJZv6kzwAAAABJRU5ErkJggg=="></image>
        </svg>
        Категории
        </button>
        <div class="allcategories_collapse collapse" id="allcategories_collapse">
            <div class="card card-body">
                <ul class="allcategories_list ul_li_block">
                <li v-for="item in categoriesList" v-bind:key="item.id" @click="closeCategoryDropdown">
                    <router-link :to="{ name: 'category', params: { id: item.id }, query: {page: 1}}">{{ item.name }}</router-link>
                </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AllCategoriesDropdown',
    computed: {
        categoriesList () {
            return this.getCategoryList()
        }
    },
    methods: {
        loadCategoryList () {
            this.$store.dispatch('loadCategoriesList')
        },
        getCategoryList() {
            return this.$store.getters.categories_list
        },
        closeCategoryDropdown() {
            let allcategories_collapse = document.getElementById('allcategories_collapse')
            if (allcategories_collapse.classList.contains('show')) {
                allcategories_collapse.classList.remove('show')
            } else {
                allcategories_collapse.classList.remove('add')
            }
        }
    },
    watch: {
        '$route': {
            immediate: true,
            handler() {
                this.loadCategoryList()
            },
        }
    },
}
</script>

<style scoped>
</style>