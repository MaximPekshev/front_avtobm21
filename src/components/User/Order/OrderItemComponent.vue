<template>
    <td>
        <div class="cart_product">
            <h3>{{ name }}</h3>
        </div>
    </td>
    <td class="text-center"><span class="price_text">{{ price }}</span></td>
    <td class="text-center">
        <div>
            <div class="quantity_input">
                {{ quantity }}
            </div>
        </div>
    </td>
    <td class="text-center"><span class="price_text">{{ summ }}</span></td>
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
            summ: this.orderItem.summ
        }
    }
}
</script>