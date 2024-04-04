<template>
<PreloaderComponent v-if="advertisementsListLoading" />
<section class="blog_section section_space pb-0">
    <div class="container">
        <div class="row justify-content-center">
            <h1 class="item_title text-center pb-5">
                Автомобили в продаже
            </h1>
            <div v-if="advertisementsListLoading" class="col col-lg-12">
                <AdvertisementListDemo
                    :advertisementListQty="advertisementsListQty"
                >
                </AdvertisementListDemo>
            </div>    
            <div v-else class="col col-lg-12">
                <div class="row">
                    <div v-for="item in advertisementsList" v-bind:key="item.id" class="col col-md-4 col-sm-4">
                        <AdvertisementListItemComponent
                            :advertisementInfo="item"
                        >
                        </AdvertisementListItemComponent>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
    import AdvertisementListItemComponent from "@/components/Main/Advertisement/AdvertisementListItemComponent.vue"
    import PreloaderComponent from '@/components/PreloaderComponent.vue'
    import AdvertisementListDemo from '@/components/Main/Advertisement/AdvertisementListDemo.vue'
    export default {
        name: 'AdvertisementListComponent',
        components: {
            AdvertisementListItemComponent,
            PreloaderComponent,
            AdvertisementListDemo
        },
        data () {
            return {
            }
        },
        computed: {
            advertisementsList () {
                return this.$store.getters.advertisementsList
            },
            advertisementsListLoading () {
                return this.$store.getters.advertisementsListLoading
            },
            advertisementsListQty () {
                return this.$store.getters.advertisementsListQty
            }
        },
        methods: {
            loadAdvertisementsList() {
                this.$store.dispatch('loadAdvertisementsList')
            }
        },
        watch: {
        '$route.query': {
            immediate: true,
            handler() {
                this.loadAdvertisementsList()
            },
        },
    },
    }
</script>
   