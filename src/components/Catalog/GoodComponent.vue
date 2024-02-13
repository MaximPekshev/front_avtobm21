<template>
    <div>
        <!-- <div class="item_badge hot_badge">
            <span>HOT</span>
        </div> -->
        <div class="item_image">
            <img :src="product_img_11" alt="Getyootech - Gadgets Ecommerce Site Template">
            <img :src="product_img_12" alt="Getyootech - Gadgets Ecommerce Site Template">
            <!-- <a class="quickview_btn" data-bs-toggle="modal" href="#quickview_popup" role="button">Quick View</a> -->
        </div>
        <div class="item_content">
            <h3 class="item_title">
            <router-link :to="{ name: 'good', params: { id: id }}">{{ name }}</router-link>
            </h3>
            <ul class="rating_star ul_li">
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="far fa-star"></i></li>
            </ul>
            <div class="item_price">
            <span>{{ price }}</span>
            <!-- <del>$720.00</del> -->
            </div>
            <ul class="item_btns_group ul_li">
            <li><a class="addtocart_btn" href="#">В корзину</a></li>
            <li><a href="#"><i class="fa-solid fa-arrows-rotate"></i></a></li>
            <li><a href="#"><i class="fas fa-heart"></i></a></li>
            </ul>
        </div>
    </div>
</template>

<script>

import product_img_11 from '@/assets/images/product_img_11.webp'
import product_img_12 from '@/assets/images/product_img_12.webp'

export default {
    name: 'GoodComponent',
    props: ['goodInfo'],
    data () {
        return {
            product_img_11,
            product_img_12,
            id: this.goodInfo.id,
            name: this.goodInfo.name,
            art: this.goodInfo.art,
            price: this.goodInfo.price,
        }
    }
}
</script>