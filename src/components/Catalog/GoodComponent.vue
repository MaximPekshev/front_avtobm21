<template>
    <div>
        <!-- <div class="item_badge hot_badge">
            <span>HOT</span>
        </div> -->
        <div v-if="mainImage" class="item_image">
            <img :src="mainImage" alt="{{ name }}">
            <img :src="mainImage" alt="{{ name }}">
            <!-- <a class="quickview_btn" data-bs-toggle="modal" href="#quickview_popup" role="button">Quick View</a> -->
        </div>
        <div v-else class="item_image">
            <img :src="product_preview" alt="{{ name }}">
            <img :src="product_preview" alt="{{ name }}">
            <!-- <a class="quickview_btn" data-bs-toggle="modal" href="#quickview_popup" role="button">Quick View</a> -->
        </div>
        <div class="item_content">
            <h3 class="item_title">
            <router-link :to="{ name: 'good', params: { id: id }}">{{ name }}</router-link>
            </h3>
            <!-- <ul class="rating_star ul_li">
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="far fa-star"></i></li>
            </ul> -->
            <div class="item_price">
            <span>{{ price }}</span>
            </div>
            <ul class="item_btns_group ul_li">
            <li>
                <a v-if="loading" class="addtocart_btn">
                    <div class="spinner-border spinner-border-sm text-primary" role="status">
                    </div>
                </a>
                <a 
                    v-else 
                    :class="{'disabled_button' : outOfStock,  'addtocart_btn' : !outOfStock}"
                    @click="addToCart">
                    в корзину
                </a>
            </li>
            <!-- <li><a href="#"><i class="fa-solid fa-arrows-rotate"></i></a></li> -->
            <li v-if="itemInWishlist(id)"><a class="wishlist-ckecked" @click="addToWishlist"><i class="fas fa-heart"></i></a></li>
            <li v-else><a @click="addToWishlist"><i class="fas fa-heart"></i></a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import {backendPath} from "@/main.js"
import product_preview from '@/assets/images/product_img_12.png'

export default {
    name: 'GoodComponent',
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
        outOfStock () {
            let outOfStock = false
            if (!(this.userToken != '' && this.balance > 0 && this.qtyInCart < this.balance)) {
                outOfStock = true
            }
            return outOfStock
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
        itemInWishlist (id) {
            return this.$store.getters.wishlistItemById(id)
        },
        addToWishlist () {
            if (this.userToken != '') {
                if (this.itemInWishlist(this.goodInfo.id)) {
                    this.$store.dispatch('addDelWishlistItem', {good_id: this.goodInfo.id, authToken: this.userToken, action: 'del'})
                } else {
                    this.$store.dispatch('addDelWishlistItem', {good_id: this.goodInfo.id, authToken: this.userToken, action: 'add'})
                }
            }
        },
        addToCart () {
            if (!this.outOfStock) {
                this.loading = true
                setTimeout(() => {
                    this.$store.dispatch('addDelCartItem', 
                    {
                        good_id: this.goodInfo.id,
                        authToken: this.userToken,
                        quantity: 1,
                        action: 'add'
                    })
                    this.loading = false
                }, 50)
            }

        },
    }
}
</script>