<template>
  <div class="body_wrap">
    <BackToTop />
    <!-- <PreloaderComponent /> -->
    <HeaderComponent />
    <FooterComponent />
  </div>
</template>

<script>
// @ is an alias to /src

// import PreloaderComponent from '@/components/PreloaderComponent.vue'
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import BackToTop from '@/components/BackToTop.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'


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
  },
  watch: {
      $route: {
          immediate: true,
          handler() {
              document.title = 'Home page'
          }
      },
  }
}
</script>
