<template>
    <div class="body_wrap">
        <BackToTop />
        <HeaderComponent />
        <main>
            <OrderListItemContentComponent />
        </main>
        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import BackToTop from '@/components/BackToTop.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import OrderListItemContentComponent from '@/components/User/Order/OrderListItemContentComponent.vue'

export default {
    name: "OrderListItemView",
    components: {
        HeaderComponent,
        BackToTop,
        FooterComponent,
        OrderListItemContentComponent
    },
}
</script>