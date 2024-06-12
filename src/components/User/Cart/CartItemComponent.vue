<template>
    <td>
        <div class="cart_product">
            <img v-if="mainImage" :src="mainImage" :alt="name">
            <img v-else :src="product_preview">
            <h3><router-link :to="{ name: 'good', params: { id: id }}">{{ name }}</router-link></h3>
        </div>
    </td>
    <td nowrap class="text-center"><span class="price_text">{{ Math.floor(balance) }}</span></td>
    <td nowrap class="text-center"><span class="price_text">{{ Math.floor(price).toLocaleString() }} &#8381;</span></td>
    <td class="text-center">
        <div>
            <div class="quantity_input">
                <button @click="decreaseQty" type="button" class="input_number_decrement">
                    <i class="fal fa-minus"></i>
                </button>
                <input 
                    @keyup.enter="setCartItemQty" 
                    @blur="setCartItemQty"
                    class="input_number" 
                    type="text" 
                    v-model="qty"
                    @keypress="isNumber($event)"
                >
                <button @click="increaseQty" type="button" class="">
                    <i class="fal fa-plus"></i>
                </button>
            </div>
        </div>
    </td>
    <td nowrap class="text-center"><span class="price_text">{{ Math.floor(amount).toLocaleString() }} &#8381;</span></td>
    <td class="text-center"><button @click="delFromCart(originalQty)" type="button" class="remove_btn"><i class="fal fa-trash-alt"></i></button></td>
</template>

<script>
import {backendPath} from "@/main.js"
import product_preview from '@/assets/images/product_img_12.png'

export default {
    name: 'CartItemComponent',
    props: ['goodInfo', 'goodsPrice', 'quantity', 'origQty'],
    data () {
        return {
            product_preview,
            id: this.goodInfo.id,
            name: this.goodInfo.name,
            price: this.goodsPrice,
            balance: this.goodInfo.balance,
            qty: Math.floor(this.quantity),
            originalQty: Math.floor(this.origQty),
        }
    },
    computed: {
        userToken () {
            return this.$store.getters.user_token
        }, 
        amount () {
            return (this.goodsPrice*this.qty).toFixed(2)
        },
        mainImage () {
            let path = ''
            if (this.goodInfo.images.length > 0) {
                path = backendPath + this.goodInfo.images[0].image.url
            }
            return path
        },
        canIncrease () {
            if (this.balance == this.quantity) {
                return false
            }
            return true
        }
    },
    methods: {
        delFromCart (qty) {
            this.$store.dispatch('addDelCartItem', {good_id: this.id, quantity:qty, authToken: this.userToken, action: 'del'})
        },
        incQtyInCart (qty) {
            this.$store.dispatch('addDelCartItem', {good_id: this.id, quantity:qty, authToken: this.userToken, action: 'add'})
        },
        decQtyInCart (qty) {
            this.$store.dispatch('addDelCartItem', {good_id: this.id, quantity:qty, authToken: this.userToken, action: 'del'})
        },
        increaseQty() {
            this.qty ++
            this.incQtyInCart (1)
        },
        decreaseQty() {
            if (this.qty > 1) {
                this.qty --
                this.decQtyInCart (1)
            }
        },
        setCartItemQty () {
            if (Number(this.qty) > 0) {
                this.$store.dispatch(
                    'setCartItemQty',
                    {
                        good_id: this.id,
                        originalQty:this.originalQty,
                        authToken: this.userToken,
                        newQty:this.qty,
                    }
                )
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
}
</script>