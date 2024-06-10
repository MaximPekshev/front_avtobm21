<template>
    <!-- <SideBarCartComponent /> -->
    <div class="body_wrap">
        <BackToTop />
        <!-- <PreloaderComponent /> -->
        <HeaderComponent />
        <!-- <main>
            <BreadCrumbs />
            <section class="product_details section_space pb-0"> -->
        <GoodContentComponent />
            <!-- </section>
        </main> -->
        <FooterComponent />
  </div>
</template>

<script>
// import PreloaderComponent from '@/components/PreloaderComponent.vue'
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import BackToTop from '@/components/BackToTop.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import GoodContentComponent from '@/components/Good/GoodContentComponent.vue'
// import SideBarCartComponent from '@/components/SideBarCartComponent.vue'

export default {
    name: 'GoodView',
    components: {
        HeaderComponent,
        BackToTop,
        // PreloaderComponent,
        FooterComponent,
        GoodContentComponent,
        // SideBarCartComponent
    },
    mounted () {
        window.scrollTo({
            top: 200,
            behavior: 'smooth'
        })
    },
}
</script>

<style scoped>

</style>