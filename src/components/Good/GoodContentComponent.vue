<template>
<PreloaderComponent v-if="goodInfoLoading" />
<div class="container" v-else>
    <div class="row">
        <div class="col col-lg-6">
            <div class="product_details_image">
                <div class="details_image_carousel">
                    <div class="slider_item">
                        <img v-if="mainImage" :src="mainImage" :alt="good.name">
                        <img v-else :src="product_preview" :alt="good.name">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
        <div class="product_details_content">
            <h2 class="item_title">{{ good.name }}</h2>
            <p>Арт.: <span>{{ good.art }}</span></p>
            <div class="item_review">
                </div>
                <div class="item_price">
                <span>Цена: </span>
                <span>{{ good.price }}</span>
            </div>

            <hr>
            <div class="quantity_wrap">
                <div>
                    <div class="quantity_input">
                        <span class="mr-2">Остаток: </span>
                        <span>{{ balance }}</span>
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
                    Сумма: {{ amount }}
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
                <li v-if="itemInWishlist(good.id)"><a class="wishlist-ckecked" @click="addToWishlist"><i class="fas fa-heart"></i></a></li>
                <li v-else><a @click="addToWishlist"><i class="fas fa-heart"></i></a></li>
            </ul>
            <ul v-if="good.applicabilities.length > 0" class="default_share_links ul_li">
                <h3 class="title_text col-12">Применимость<span class="underline"></span></h3>
                <li v-for="item in good.applicabilities" v-bind:key="item.id">
                    <a>
                    <small>{{ item.model.name }}</small>
                    </a>
                </li>
            </ul>
        </div>
        </div>
    </div>
</div>
</template>

<script>
import {backendPath} from "@/main.js"
import product_preview from '@/assets/images/product_img_12.png'
import PreloaderComponent from '@/components/PreloaderComponent.vue'


export default {
    name: 'GoodContentComponent',
    data () {
        return {
            product_preview,
            qty: 1,
            loading: false,
        }
    },
    components: {
        PreloaderComponent,
    },
    computed: {
        good () {
            return this.getGoodInfo()
        },
        amount () {
            return (this.qty * this.good.price).toFixed(2)
        },
        balance () {
            return Math.floor(this.good.balance)
        },
        applicabilities () {
            let applicabilities = ''
            if (this.good.applicabilities) {
                this.good.applicabilities.forEach((item) => {
                    applicabilities += `${item.model.name} `
                })
            }
            return (applicabilities)
        },
        userToken () {
            return this.$store.getters.user_token
        }, 
        goodInfoLoading () {
            return this.$store.getters.good_info_loading
        },
        mainImage () {
            let path = ''
            if (this.good.images.length > 0) {
                path = backendPath + this.good.images[0].image.url
            }
            return path
        },
        canIncrease () {
            if (this.good.balance <= (this.qty + Number(this.qtyInCart))) {
                return false
            }
            return true
        },
        qtyInCart () {
            let cartItemById = this.$store.getters.cartItemById(this.good.id)
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
            this.$store.dispatch('loadGoodInfo', id)
        },
        getGoodInfo() {
            return this.$store.getters.good
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
            if (this.userToken != '') {
                if (this.itemInWishlist(this.good.id)) {
                    this.$store.dispatch('addDelWishlistItem', {good_id: this.good.id, authToken: this.userToken, action: 'del'})
                } else {
                    this.$store.dispatch('addDelWishlistItem', {good_id: this.good.id, authToken: this.userToken, action: 'add'})
                }
            }    
        },
        addToCart () {
            if (Number(this.qty) > 0) {
                this.loading = true
                setTimeout(() => {
                    this.$store.dispatch('addDelCartItem', 
                    {
                        good_id: this.good.id,
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
        good: {
            deep: true,
            handler() {
                this.setPageTitle(this.good.name)
            }
        }
    },
}
</script>
