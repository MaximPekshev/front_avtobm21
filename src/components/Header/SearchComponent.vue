<template>
    <div>
        <div class="advance_search">
            <div class="form_item">
                <input
                    v-model="searchInput"
                    type="search"
                    name="search"
                    placeholder="Поиск..."
                    @keyup.enter="searchResult"
                    >
            </div>
            <button
            @click="searchResult"
            type="submit"
            class="search_btn">
                <i class="far fa-search"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchComponent',
    data() {
        return {
            searchInput: ""
        }
    },
    methods: {
        searchResult: function(el) {
            el.preventDefault()
            if (this.searchInput != '') {
                this.$router.push({ name: 'catalog', query: { q:this.searchInput, page:1 } })
            }
        },
    },
    watch: {
        '$route.query': {
            immediate: true,
            handler() {
                if (!this.$route.query.q == '') {
                    this.searchInput = this.$route.query.q
                }
            },
        },
    },
}
</script>

<style scoped>
</style>