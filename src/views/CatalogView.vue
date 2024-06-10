<template>
    <!-- <SideBarCartComponent /> -->
    <div class="body_wrap">
        <BackToTop />
        <!-- <PreloaderComponent /> -->
        <HeaderComponent />
        <main>
            <CatalogBreadCrumbs />
            <section class="product_section section_space">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-9">
                            <FilterTopBarComponent />
                            <hr>
                            <ContentComponent />
                        </div>
                        <div class="col-lg-3 order-lg-first">
                            <SideBarComponent />
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <FooterComponent />
        <router-view></router-view>
  </div>
</template>

<script>
// import PreloaderComponent from '@/components/PreloaderComponent.vue'
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import BackToTop from '@/components/BackToTop.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import CatalogBreadCrumbs from '@/components/Catalog/CatalogBreadCrumbs.vue'
import SideBarComponent from '@/components/Catalog/SideBarComponent.vue'
import FilterTopBarComponent from '@/components/Catalog/FilterTopBarComponent.vue'
import ContentComponent from '@/components/Catalog/ContentComponent.vue'
// import SideBarCartComponent from '@/components/SideBarCartComponent.vue'

export default {
    name: 'CatalogView',
    components: {
        HeaderComponent,
        BackToTop,
        // PreloaderComponent,
        FooterComponent,
        CatalogBreadCrumbs,
        SideBarComponent,
        FilterTopBarComponent,
        ContentComponent,
        // SideBarCartComponent
    },
    mounted () {
        window.scrollTo({
            top: 200,
            behavior: 'smooth'
        })
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                document.title = 'Каталог'
            },
        },
    },
}
</script>

<style scoped>

</style>