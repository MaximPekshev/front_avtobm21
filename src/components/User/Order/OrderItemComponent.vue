<template>
    <td>
        <div class="cart_product">
            <h3>{{ name }}</h3>
        </div>
    </td>
    <td nowrap class="text-center"><span class="price_text">{{  Math.floor(price).toLocaleString() }} &#8381;</span></td>
    <td class="text-center">
        <div>
            <div class="quantity_input">
                {{ quantity }}
            </div>
        </div>
    </td>
    <td nowrap class="text-center"><span class="price_text">{{  Math.floor(amount).toLocaleString() }} &#8381;</span></td>
</template>

<script>
export default {
    name: "OrderItemComponent",
    props: [ "orderItem" ],
    data () {
        return {
            name: this.orderItem.good.name,
            price: this.orderItem.price,
            quantity: Math.floor(this.orderItem.quantity),
            amount: this.orderItem.summ
        }
    }
}
</script>