<template>
    <!-- <SideBarCartComponent /> -->
    <div class="body_wrap">
        <BackToTop />
        <!-- <PreloaderComponent /> -->
        <HeaderComponent />
        <main>
            <AdvBreadCrumbs />
            <section class="product_details section_space pb-0">
               <AdvItemContentComponent />
            </section>
        </main>
        <FooterComponent />
  </div>
</template>

<script>
// import PreloaderComponent from '@/components/PreloaderComponent.vue'
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import BackToTop from '@/components/BackToTop.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import AdvItemContentComponent from '@/components/Main/AdvertisementItem/AdvItemContentComponent.vue'
import AdvBreadCrumbs from '@/components/Main/AdvertisementItem/AdvBreadCrumbs.vue'

export default {
    name: 'AdvertisementItem',
    components: {
        HeaderComponent,
        BackToTop,
        // PreloaderComponent,
        FooterComponent,
        AdvItemContentComponent,
        AdvBreadCrumbs,
        // BreadCrumbs,
        // GoodContentComponent,
        // SideBarCartComponent
    },
    methods: {
        loadAdvertisementsList() {
            this.$store.dispatch('loadAdvertisementsList')
        }
    },
    mounted () {
        window.scrollTo({
            top: 200,
            behavior: 'smooth'
        })
    },
    watch: {
        '$route.query.id': {
            immediate: true,
            handler() {
                this.loadAdvertisementsList()
            },
        },
    }
}
</script>

<style scoped>

</style>