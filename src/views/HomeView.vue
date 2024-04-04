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
// @ is an alias to /src

// import PreloaderComponent from '@/components/PreloaderComponent.vue'
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import BackToTop from '@/components/BackToTop.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import AdvertisementComponent from '@/components/Main/Advertisement/AdvertisementListComponent.vue'
// import SideBarCartComponent from '@/components/SideBarCartComponent.vue'


export default {
  name: 'HomeView',
  metaInfo: {
      title: 'Default Title',
  },
  components: {
    HeaderComponent,
    BackToTop,
    // PreloaderComponent,
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
