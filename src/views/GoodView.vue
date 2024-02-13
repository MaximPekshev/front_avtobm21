<template>
    <div class="body_wrap">
        <BackToTop />
        <!-- <PreloaderComponent /> -->
        <HeaderComponent />
        <BreadCrumbs />
        <section class="product_details section_space pb-0">
            <GoodContentComponent />
        </section>
        <FooterComponent />
  </div>
</template>

<script>
// import PreloaderComponent from '@/components/PreloaderComponent.vue'
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import BackToTop from '@/components/BackToTop.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import BreadCrumbs from '@/components/Good/GoodBreadCrumbs.vue'
import GoodContentComponent from '@/components/Good/GoodContentComponent.vue'

export default {
    name: 'GoodView',
    components: {
        HeaderComponent,
        BackToTop,
        // PreloaderComponent,
        FooterComponent,
        BreadCrumbs,
        GoodContentComponent,
    },
    // mounted() {
    //     this.getGoodInfo()
    // },
    methods: {
    }
}
</script>

<style scoped>

</style>