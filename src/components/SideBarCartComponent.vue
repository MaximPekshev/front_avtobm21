<template>
    <div class="sidebar-menu-wrapper">
        <div class="cart_sidebar">
        <button type="button" class="close_btn"><i class="fal fa-times"></i></button>

        <ul class="cart_items_list ul_li_block mb_30 clearfix">
            <li>
            <div class="item_image">
                <img :src="product_img_11" alt="Getyootech - Gadgets Ecommerce Site Template">
            </div>
            <div class="item_content">
                <h4 class="item_title">Yellow Blouse</h4>
                <span class="item_price">$30.00</span>
            </div>
            <button type="button" class="remove_btn"><i class="fal fa-trash-alt"></i></button>
            </li>
            <li>
            <div class="item_image">
                <img :src="product_img_11" alt="Getyootech - Gadgets Ecommerce Site Template">
            </div>
            <div class="item_content">
                <h4 class="item_title">Yellow Blouse</h4>
                <span class="item_price">$30.00</span>
            </div>
            <button type="button" class="remove_btn"><i class="fal fa-trash-alt"></i></button>
            </li>
            <li>
            <div class="item_image">
                <img :src="product_img_11" alt="Getyootech - Gadgets Ecommerce Site Template">
            </div>
            <div class="item_content">
                <h4 class="item_title">Yellow Blouse</h4>
                <span class="item_price">$30.00</span>
            </div>
            <button type="button" class="remove_btn"><i class="fal fa-trash-alt"></i></button>
            </li>
        </ul>

        <ul class="total_price ul_li_block mb_30 clearfix">
            <li>
            <span>Subtotal:</span>
            <span>$90</span>
            </li>
            <li>
            <span>Vat 5%:</span>
            <span>$4.5</span>
            </li>
            <li>
            <span>Discount 20%:</span>
            <span>- $18.9</span>
            </li>
            <li>
            <span>Total:</span>
            <span>$75.6</span>
            </li>
        </ul>

        <ul class="btns_group ul_li_block clearfix">
            <li><a class="btn btn_primary" href="cart.html.htm">View Cart</a></li>
            <li><a class="btn btn_secondary" href="checkout.html.htm">Checkout</a></li>
        </ul>
        </div>

        <div class="cart_overlay"></div>
    </div>
</template>

<script>
import product_img_11 from '@/assets/images/product_img_12.webp'
export default {
    name: 'SideBarCartComponent',
    data () {
        return {
            product_img_11
        }
    }
}
</script>

<style scoped>
</style>
