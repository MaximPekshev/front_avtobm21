<template>
    <td>
        <div class="cart_product">
        <img v-if="mainImage" :src="mainImage" alt="{{ name }}">
        <img v-else :src="product_preview" alt="{{ name }}">
        <h3><router-link :to="{ name: 'good', params: { id: id }}">{{ name }}</router-link></h3>
        </div>
    </td>
    <td class="text-center"><span class="price_text">{{ price }}</span></td>
    <td class="text-center">
        <div>
            <div class="quantity_input">
                <button @click="decreaseQty" type="button" class="input_number_decrement">
                <i class="fal fa-minus"></i>
                </button>
                <input class="input_number" type="text" :value="qty" readonly>
                <button @click="increaseQty" type="button" class="input_number_increment">
                <i class="fal fa-plus"></i>
                </button>
            </div>
        </div>
    </td>
    <td class="text-center"><span class="price_text">{{ amount }}</span></td>
    <td class="text-center"><button @click="delFromCart" type="button" class="remove_btn"><i class="fal fa-trash-alt"></i></button></td>
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
            qty: (this.goodInfo.balance > 0) ? Math.floor(this.quantity) : 0,
        }
    },
    computed: {
        userToken () {
            return this.$store.getters.user_token
        }, 
        amount () {
            return (this.goodInfo.price*this.qty).toFixed(2)
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
        delFromCart () {
            this.$store.dispatch('addDelCartItem', {good_id: this.id, quantity:this.qty, authToken: this.userToken, action: 'del'})
        },
        incQtyInCart () {
            this.$store.dispatch('addDelCartItem', {good_id: this.id, quantity:1, authToken: this.userToken, action: 'add'})
        },
        decQtyInCart () {
            this.$store.dispatch('addDelCartItem', {good_id: this.id, quantity:1, authToken: this.userToken, action: 'del'})
        },
        increaseQty() {
            if (this.qty < this.balance) {
                this.qty ++
                this.incQtyInCart ()
            }
        },
        decreaseQty() {
            if (this.qty > 1) {
                this.qty --
                this.decQtyInCart ()
            }
        },
    }
}
</script>