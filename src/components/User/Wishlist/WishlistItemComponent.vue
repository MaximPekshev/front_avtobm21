<template>
    <td>
        <div class="cart_product">
            <img :src="product_img_12" alt="Getyootech - Gadgets Ecommerce Site Template">
            <h3>{{ this.goodInfo.name }}</h3>
        </div>
    </td>
    <td class="text-center"><span class="price_text">{{ this.goodInfo.price }}</span></td>
    <td class="text-center">
        <span class="price_text text-success" v-if="balance > 0">В наличии</span>
        <span class="price_text text-danger" v-else>Нет в наличии</span>
    </td>
    <td class="text-center">
        <a href="#!" class="btn btn_gray">
            <i class="fa fa-cart-plus" :class="{ 'text-secondary': balance == 0 }"></i>
        </a>
    </td>
    <td class="text-center">
        <button @click="delFromWishlist" class="remove_btn">
            <i class="fal fa-trash-alt"></i>
        </button>
    </td>
</template>

<script>

import product_img_12 from '@/assets/images/product_img_12.webp'

export default {
    name: 'WishlistItemComponent',
    props: ['goodInfo'],
    data () {
        return {
            product_img_12,
            id: this.goodInfo.id,
            name: this.goodInfo.name,
            art: this.goodInfo.art,
            price: this.goodInfo.price,
            balance: Math.floor(this.goodInfo.balance)
        }
    },
    computed: {
        userToken () {
            return this.$store.getters.user_token
        }, 
    },
    methods: {
        delFromWishlist () {
            this.$store.dispatch('addDelWishlistItem', {good_id: this.goodInfo.id, authToken: this.userToken, action: 'del'})
        }
    }
}
</script>