<template>
    <td>
        <div class="cart_product">
            <img v-if="mainImage" :src="mainImage" :alt="name">
            <img v-else :src="product_preview">
            <h3><router-link :to="{ name: 'good', params: { id: id }}">{{ name }}</router-link></h3>
        </div>
    </td>
    <td class="text-center"><span class="price_text">{{ Math.floor(price).toLocaleString() }} &#8381;</span></td>
    <td class="text-center">
        <span class="price_text text-success" v-if="balance > 0">В наличии</span>
        <span class="price_text text-danger" v-else>Нет в наличии</span>
    </td>
    <td class="text-center">
        <a v-if="loading" class="btn btn_gray">
            <div class="spinner-border spinner-border-sm text-primary" role="status">
            </div>
        </a>
        <a v-else 
            class="btn btn_gray" 
            @click="addToCart">
            <i class="fa fa-cart-plus"></i>
        </a>
    </td>
    <td class="text-center">
        <button @click="delFromWishlist" class="remove_btn">
            <i class="fal fa-trash-alt"></i>
        </button>
    </td>
</template>

<script>
import {backendPath} from "@/main.js"
import product_preview from '@/assets/images/product_img_12.png'

export default {
    name: 'WishlistItemComponent',
    props: ['goodInfo'],
    data () {
        return {
            product_preview,
            id: this.goodInfo.id,
            name: this.goodInfo.name,
            art: this.goodInfo.art,
            price: this.goodInfo.price,
            balance: Math.floor(this.goodInfo.balance),
            loading: false,
        }
    },
    computed: {
        userToken () {
            return this.$store.getters.user_token
        },
        qtyInCart () {
            let cartItemById = this.$store.getters.cartItemById(this.id)
            let qtyInCart = 0
            if (cartItemById) {
                qtyInCart = cartItemById.quantity
            }
            return qtyInCart
        },
        mainImage () {
            let path = ''
            if (this.goodInfo.images.length > 0) {
                path = backendPath + this.goodInfo.images[0].image.url
            }
            return path
        },
    },
    methods: {
        delFromWishlist () {
            this.$store.dispatch('addDelWishlistItem', {good_id: this.id, authToken: this.userToken, action: 'del'})
        },
        addToCart () {
            this.loading = true
            setTimeout(() => {
                this.$store.dispatch('addDelCartItem', 
                {
                    good_id: this.id,
                    authToken: this.userToken,
                    quantity: 1,
                    action: 'add'
                })
                this.loading = false    
            }, 50)
        },
    }
}
</script>