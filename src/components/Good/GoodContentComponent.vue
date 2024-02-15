<template>
<PreloaderComponent v-if="goodInfoLoading" />
<div class="container" v-else>
    <div class="row">
        <div class="col col-lg-6">
            <div class="product_details_image">
                <div class="details_image_carousel">
                    <div class="slider_item">
                        <img :src="image" :alt="good.name">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
        <div class="product_details_content">
            <h2 class="item_title">{{ good.name }}</h2>
            <p>Арт.: <span>{{ good.art }}</span>
            </p>
            <div class="item_review">
                <!-- <ul class="rating_star ul_li">
                    <li><i class="fa-solid fa-star"></i></li>
                    <li><i class="fa-solid fa-star"></i></li>
                    <li><i class="fa-solid fa-star"></i></li>
                    <li><i class="fa-solid fa-star"></i></li>
                    <li><i class="fa-solid fa-star"></i></li>
                </ul> -->
                <!-- <span class="review_value">3 Rating(s)</span> -->
                </div>
                <div class="item_price">
                <span>Цена: </span>
                <span>{{ good.price }}</span>
                <!-- <del>$720.00</del> -->
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
            <div v-if="good.balance > 0" class="quantity_wrap">
                <div>
                    <div class="quantity_input">
                        <span class="mr-2">Кол-во: </span>
                        <button @click="decreaseQty" type="button" class="input_number_decrement">
                            <i class="fal fa-minus"></i>
                        </button>
                            <input readonly class="input_number" type="text" :value="qty">
                        <button @click="increaseQty" type="button" class="input_number_increment">
                            <i class="fal fa-plus"></i>
                        </button>
                    </div>
                </div>

                <div class="total_price">
                    Сумма: {{ amount }}
                </div>
            </div>

            <ul class="default_btns_group ul_li">
                <li v-if="good.balance > 0"><a class="addtocart_btn" href="#">В корзину</a></li>
                <li><a href="#"><i class="fa-solid fa-arrows-rotate"></i></a></li>
                <li v-if="itemInWishlist(good.id)"><a class="wishlist-ckecked" @click="addToWishlist"><i class="fas fa-heart"></i></a></li>
                <li v-else><a @click="addToWishlist"><i class="fas fa-heart"></i></a></li>
            </ul>

            <ul class="default_share_links ul_li">
                <li>
                    <a class="facebook" href="#">
                    <span><i class="fab fa-facebook-square"></i> Like</span>
                    <small>10K</small>
                    </a>
                </li>
                <li>
                    <a class="twitter" href="#">
                    <span><i class="fab fa-twitter-square"></i> Tweet</span>
                    <small>15K</small>
                    </a>
                </li>
                <li>
                    <a class="google" href="#">
                    <span><i class="fab fa-google-plus-square"></i> Google+</span>
                    <small>20K</small>
                    </a>
                </li>
                <li>
                    <a class="share" href="#">
                    <span><i class="fas fa-plus-square"></i> Share</span>
                    </a>
                </li>
            </ul>
        </div>
        </div>
    </div>
    </div>
</template>

<script>

import image from '@/assets/images/product_details_img_1.webp'
import PreloaderComponent from '@/components/PreloaderComponent.vue'


export default {
    name: 'GoodContentComponent',
    data () {
        return {
            image,
            qty: 1,
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
        userToken () {
            return this.$store.getters.user_token
        }, 
        goodInfoLoading () {
            return this.$store.getters.good_info_loading
        }
    },
    methods: {
        getGoodInfoLoadingStatus() {
            return this.$store.getters.good_info_loading
        },
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
            if (this.qty < this.balance) {
                this.qty ++
            }
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
