<template>
    <!-- <SideBarCartComponent /> -->
    <div class="body_wrap">
        <BackToTop />
        <!-- <PreloaderComponent /> -->
        <HeaderComponent />
        <main>
            <CategoryBreadCrumbs />
            <section class="product_section section_space">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-9">
                            <FilterTopBarComponent />
                            <hr>
                            <ContentComponent />
                        </div>
                        <div class="col-lg-3 order-lg-first">
                            <!-- <SideBarComponent /> -->
                        </div>
                    </div>
                </div>
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
import CategoryBreadCrumbs from '@/components/Category/CategoryBreadCrumbs.vue'
// import SideBarComponent from '@/components/Catalog/SideBarComponent.vue'
import FilterTopBarComponent from '@/components/Catalog/FilterTopBarComponent.vue'
import ContentComponent from '@/components/Category/ContentComponent.vue'
// import SideBarCartComponent from '@/components/SideBarCartComponent.vue'

export default {
    name: 'CategoryView',
    components: {
        HeaderComponent,
        BackToTop,
        // PreloaderComponent,
        FooterComponent,
        CategoryBreadCrumbs,
        // SideBarComponent,
        FilterTopBarComponent,
        ContentComponent,
        // SideBarCartComponent
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                document.title = 'Катеория'
            },
        },
    },
}
</script>

<style scoped>

</style>