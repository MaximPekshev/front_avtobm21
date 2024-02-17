<template>
    <router-link :to="{ name: 'cart'}" type="button" class="cart_btn">
        <span class="cart_icon">
          <i class="icon icon-ShoppingCart"></i>
          <small class="cart_counter" v-if="cartQty > 0">{{ cartQty }}</small>
        </span>
        <span class="cart_amount">{{ cartAmount }}</span>
    </router-link>
</template>
<script>
import { useCookies } from "vue3-cookies"
export default {
    name: 'CartComponent',
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    computed: {
      userToken () {
        return this.$store.getters.user_token
      },
      cartQty () {
        return this.$store.getters.cartQty
      },
      cartAmount () {
        return this.$store.getters.cartAmount.toFixed(2)
      },
    },
    mounted () {
      this.loadCart()
    },  
    methods: {
        loadCart () {
            let authToken = this.cookies.get("avtobm21_token") 
            if (authToken) {
                this.$store.dispatch('loadCart', authToken)
            } else {
                this.$store.dispatch('loadCart', this.userToken)
            }
        }
    },
    watch: {
      '$route': {
        immediate: true,
        handler() {
          if (this.userToken != '') {
            this.loadCart()
          }
        },
      }
    }
}
</script>

<style scoped>

</style>