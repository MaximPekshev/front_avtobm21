<template>
    <td>
        <div class="cart_product">
        <img :src="product_img_12" alt="Getyootech - Gadgets Ecommerce Site Template">
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

import product_img_12 from '@/assets/images/product_img_12.webp'

export default {
    name: 'CartItemComponent',
    props: ['goodInfo', 'quantity'],
    data () {
        return {
            product_img_12,
            id: this.goodInfo.id,
            name: this.goodInfo.name,
            price: this.goodInfo.price,
            balance: this.goodInfo.balance,
            qty: Math.floor(this.quantity)
        }
    },
    computed: {
        userToken () {
            return this.$store.getters.user_token
        }, 
        amount () {
            return (this.goodInfo.price*this.qty).toFixed(2)
        }
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