<template>
    <main>
        <BreadCrumbs 
            :goodsName ="goodInfo.name"
        ></BreadCrumbs>
        <section class="product_details section_space pb-0">
            <PreloaderComponent v-if="goodInfoLoading" />
            <div class="container" v-else>
                <div class="row">
                    <div class="col col-lg-6">
                        <div class="product_details_image">
                            <div class="details_image_carousel">
                                <div class="slider_item">
                                    <img 
                                        v-if="mainImage" 
                                        :src="mainImage" 
                                        :alt="goodInfo.name"
                                        v-fullscreen-image="{
                                            imageUrl: mainImage,
                                            withDownload: false,
                                            animation: 'blur'
                                        }"
                                    />
                                    <img v-else :src="product_preview" :alt="goodInfo.name">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                    <div class="product_details_content">
                        <h2 class="item_title">{{ goodInfo.name }}</h2>
                        <p>Арт.: <span>{{ goodInfo.art }}</span></p>
                        <div class="item_review">
                            </div>
                            <div class="item_price">
                            <span>Цена: </span>
                            <span>{{ Math.floor(goodsPrice).toLocaleString() }} &#8381;</span>
                        </div>

                        <hr>
                        <div class="quantity_wrap">
                            <div>
                                <div v-if="balance > 0" class="quantity_input">
                                    <span class="mr-2">Остаток: </span>
                                    <span>{{ balance }}</span>
                                </div>
                                <div v-else class="quantity_input">
                                    <span>Нет в наличии, возможно под заказ.</span>
                                </div>
                            </div>
                        </div>
                        <div class="quantity_wrap">
                            <div>
                                <div class="quantity_input">
                                    <span class="mr-2">Кол-во: </span>
                                    <button @click="decreaseQty" type="button" class="input_number_decrement">
                                        <i class="fal fa-minus"></i>
                                    </button>
                                    <input @keypress="isNumber($event)" class="input_number" type="text" v-model="qty">
                                    <button @click="increaseQty" type="button">
                                        <i class="fal fa-plus"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="total_price">
                                Сумма: {{ Math.floor(amount).toLocaleString() }} &#8381;
                            </div>
                        </div>

                        <ul class="default_btns_group ul_li mb-5">
                            <li>
                                <a v-if="loading" class="addtocart_btn">
                                    <div class="spinner-border spinner-border-sm text-primary" role="status">
                                    </div>
                                </a>
                                <a v-else @click="addToCart" class="addtocart_btn">
                                    В корзину
                                </a>
                            </li>
                            <li v-if="itemInWishlist(goodInfo.id)"><a class="wishlist-ckecked" @click="addToWishlist"><i class="fas fa-heart"></i></a></li>
                            <li v-else><a @click="addToWishlist"><i class="fas fa-heart"></i></a></li>
                        </ul>
                        <ul v-if="goodInfo.applicabilities.length > 0" class="default_share_links ul_li">
                            <h3 class="title_text col-12">Применимость<span class="underline"></span></h3>
                            <li v-for="item in goodInfo.applicabilities" v-bind:key="item.id">
                                <a>
                                <small>{{ item.model.name }}</small>
                                </a>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    </main>        
</template>

<script>
import {backendPath} from "@/main.js"
import product_preview from '@/assets/images/product_img_12.png'
import PreloaderComponent from '@/components/PreloaderComponent.vue'
import BreadCrumbs from '@/components/Good/GoodBreadCrumbs.vue'

import { useCookies } from "vue3-cookies"
export default {
    name: 'GoodContentComponent',
    setup() {
        const { cookies } = useCookies()
        return { cookies }
    },
    data () {
        return {
            product_preview,
            qty: 1,
            loading: false,
        }
    },
    components: {
        PreloaderComponent,
        BreadCrumbs,
    },
    computed: {
        userToken () {
            return this.$store.getters.user_token
        },
        goodInfo () {
            return this.$store.getters.goodInfo
        },
        goodsPrice () {
            return this.$store.getters.goodsPrice
        },
        amount () {
            return (this.qty * this.goodsPrice).toFixed(2)
        },
        balance () {
            return Math.floor(this.goodInfo.balance)
        },
        applicabilities () {
            let applicabilities = ''
            if (this.goodInfo.applicabilities) {
                this.goodInfo.applicabilities.forEach((item) => {
                    applicabilities += `${item.model.name} `
                })
            }
            return (applicabilities)
        },
        goodInfoLoading () {
            return this.$store.getters.good_info_loading
        },
        mainImage () {
            let path = ''
            if (this.goodInfo.images.length > 0) {
                path = backendPath + this.goodInfo.images[0].image.url
            }
            return path
        },
        canIncrease () {
            if (this.goodInfo.balance <= (this.qty + Number(this.qtyInCart))) {
                return false
            }
            return true
        },
        qtyInCart () {
            let cartItemById = this.$store.getters.cartItemById(this.goodInfo.id)
            let qtyInCart = 0
            if (cartItemById) {
                qtyInCart = cartItemById.quantity
            }
            return qtyInCart
        },
    },
    methods: {
        setPageTitle(payload) {
            document.title = payload
        },
        loadGoodInfo(id) {
            let data = {
                id: id
            }
            let authToken = this.cookies.get("avtobm21_token") 
            if (authToken) {
                data["authToken"] = authToken
            } else if (this.userToken) {
                data["authToken"] = this.userToken
            }
            this.$store.dispatch('loadGoodInfo', data)
        },
        increaseQty() {
            this.qty ++
        },
        decreaseQty() {
            if (this.qty > 1) {
                this.qty --
            }
        },
        itemInWishlist (id) {
            return this.$store.getters.wishlistItemById(id)
        },
        addToWishlist () {
            if (this.userToken) {
                if (this.itemInWishlist(this.goodInfo.id)) {
                    this.$store.dispatch('addDelWishlistItem', {good_id: this.goodInfo.id, authToken: this.userToken, action: 'del'})
                } else {
                    this.$store.dispatch('addDelWishlistItem', {good_id: this.goodInfo.id, authToken: this.userToken, action: 'add'})
                }
            }    
        },
        addToCart () {
            if (Number(this.qty) > 0 && this.userToken) {
                this.loading = true
                setTimeout(() => {
                    this.$store.dispatch('addDelCartItem', 
                    {
                        good_id: this.goodInfo.id,
                        authToken: this.userToken,
                        quantity: this.qty,
                        action: 'add'
                    })
                    this.loading = false
                }, 50)    
            }
        },
        isNumber (evt) {
            const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            const keyPressed = evt.key;
            
            if (!keysAllowed.includes(keyPressed)) {
                evt.preventDefault()
            }
        }
    },
    watch: {
        '$route.query.id': {
            immediate: true,
            handler() {
                this.loadGoodInfo(this.$route.params.id)
            },
        },
        goodInfo: {
            deep: true,
            handler() {
                this.setPageTitle(this.goodInfo.name)
            }
        }
    },
}
</script>
