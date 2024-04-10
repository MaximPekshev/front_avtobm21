<template>
    <div class="body_wrap">
        <BackToTop />
        <HeaderComponent />
        <main>
          <OrderListContentComponent />
        </main>
        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import BackToTop from '@/components/BackToTop.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import OrderListContentComponent from '@/components/User/Order/OrderListContentComponent.vue'

export default {
  name: 'OrderListView',
  components: {
    HeaderComponent,
    BackToTop,
    FooterComponent,
    OrderListContentComponent,
  },
}
</script>