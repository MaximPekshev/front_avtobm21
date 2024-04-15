<template>
    <div class="body_wrap">
      <BackToTop />
      <HeaderComponent />
      <main>
        <section class="error_section section_space">
          <div class="container">
            <div class="error_content">
              <h1>4<span>0</span>4</h1>
              <h2>К сожалению, запрашиваемая вами страница не найдена.</h2>
            </div>
            <div class="row justify-content-center">
              <div class="col col-lg-6">
                <div class="error_search_form text-center">
                    <router-link to="/" type="submit" class="btn btn_secondary">На главную</router-link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import HeaderComponent from '@/components/Header/HeaderComponent.vue'
  import BackToTop from '@/components/BackToTop.vue'
  import FooterComponent from '@/components/Footer/FooterComponent.vue'
  
  export default {
    name: 'HomeView',
    components: {
      HeaderComponent,
      BackToTop,
      FooterComponent,
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                document.title = '404 - Page not found'
            }
        },
    }
  }
  </script>
  