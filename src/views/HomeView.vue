<template>
  <!-- <SideBarCartComponent /> -->
  <div class="body_wrap">
    <BackToTop />
    <HeaderComponent />
    <main>
      <AdvertisementComponent />
    </main>
    <!-- <PreloaderComponent /> -->
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import BackToTop from '@/components/BackToTop.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import AdvertisementComponent from '@/components/Main/Advertisement/AdvertisementListComponent.vue'
// import SideBarCartComponent from '@/components/SideBarCartComponent.vue'

export default {
  name: 'HomeView',
  components: {
    HeaderComponent,
    BackToTop,
    FooterComponent,
    AdvertisementComponent
    // SideBarCartComponent
  },
  watch: {
      $route: {
          immediate: true,
          handler() {
              document.title = 'Главная'
          }
      },
  }
}
</script>
