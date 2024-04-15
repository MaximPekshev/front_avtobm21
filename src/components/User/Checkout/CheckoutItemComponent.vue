<template>
    <td>
        <div class="cart_product">
            <img v-if="mainImage" :src="mainImage" :alt="name">
            <img v-else :src="product_preview">
            <h3>{{ name }}</h3>
        </div>
    </td>
    <td nowrap><span class="price_text">{{ Math.floor(price).toLocaleString() }} &#8381;</span></td>
    <td><strong class="quantity_count">{{ quantity }}</strong></td>
    <td nowrap><span class="price_text">{{  Math.floor(amount).toLocaleString() }} &#8381;</span></td>
</template>

<script>
import {backendPath} from "@/main.js"
import product_preview from '@/assets/images/product_img_12.png'

export default {
    name: 'CartItemComponent',
    props: ['goodInfo', 'quantity'],
    data () {
        return {
            product_preview,
            id: this.goodInfo.id,
            name: this.goodInfo.name,
            price: this.goodInfo.price,
            balance: this.goodInfo.balance,
        }
    },
    computed: {
        userToken () {
            return this.$store.getters.user_token
        }, 
        amount () {
            return (this.goodInfo.price*this.quantity).toFixed(2)
        },
        mainImage () {
            let path = ''
            if (this.goodInfo.images.length > 0) {
                path = backendPath + this.goodInfo.images[0].image.url
            }
            return path
        }
    },
    methods: {
    }
}
</script>