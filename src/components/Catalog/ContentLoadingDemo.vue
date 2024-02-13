<template>
    <div class="product_layout1" v-for="item in demoContentCount" v-bind:key="item.id">
        <div class="item_image">
        </div>
        <div class="item_content">
            <h3 class="item_title">
            <a></a>
            </h3>
            <div class="item_price">
            <span></span>
            </div>
            <ul class="item_btns_group ul_li">
            <li><a class="addtocart_btn"></a></li>
            <li><a style="background-color: #f4f4f4;"></a></li>
            <li><a style="background-color: #f4f4f4;"></a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContentLoadingDemo',
    props: [],
    data() {
        return {
            demoContentCount: 28,
        }
    }
}
</script>