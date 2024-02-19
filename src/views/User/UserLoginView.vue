<template>
    <!-- <SideBarCartComponent /> -->
    <div class="body_wrap">
        <BackToTop />
        <HeaderComponent />
        <main>
          <DefaultBreadCrumbs pageName="Авторизация" />
          <LoginComponent />
        </main>
        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import BackToTop from '@/components/BackToTop.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import DefaultBreadCrumbs from '@/components/DefaultBreadCrumbs.vue'
import LoginComponent from '@/components/User/LoginComponent.vue'
// import SideBarCartComponent from '@/components/SideBarCartComponent.vue'

export default {
  name: 'UserLoginView',
  components: {
    HeaderComponent,
    BackToTop,
    FooterComponent,
    DefaultBreadCrumbs,
    LoginComponent,
    // SideBarCartComponent
  },
  computed: {
    userInfo () {
      return this.$store.getters.user
    }
  },
  watch: {
    userInfo: {
      deep: true,
      handler() {
        if (this.userInfo) {
          this.$router.push({ name : 'userAccount' })
        } 
      }
    },
    $route: {
        immediate: true,
        handler() {
            document.title = 'Авторизация'
        }
    },
  } 
}
</script>