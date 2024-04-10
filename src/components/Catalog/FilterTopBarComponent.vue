<template>
    <div class="filter_topbar">
        <div class="row align-items-center">
            <div class="col col-md-4 col-sm-4">
                <!-- <ul class="layout_btns nav" role="tablist">
                <li role="presentation">
                    <button class="active" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                    <i class="fal fa-bars"></i>
                    </button>
                </li>
                <li role="presentation">
                    <button data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                    <i class="fal fa-th-large"></i>
                    </button>
                </li>
                </ul> -->
            </div>

            <div class="col col-md-4 col-sm-4">
                <!-- <form action="#">
                    <div class="select_option clearfix">
                        <select>
                            <option data-display="Defaul Sorting">Select Your Option</option>
                            <option value="1">Sorting By Name</option>
                            <option value="2">Sorting By Price</option>
                            <option value="3">Sorting By Size</option>
                        </select>
                    </div>
                </form> -->
            </div>

            <div class="col col-md-4 col-sm-4">
                <!-- <div class="result_text">Showing {{ goodsOnPageQty }} of {{ allGoodsQty }} relults</div> -->
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'FilterTopBarComponent',
    computed: {
        allGoodsQty () {
            return this.getGoodsQty()
        },
        goodsOnPageQty () {
            let goodsOnPageQty = this.getGoodsOnPageQty()
            let allGoodsQty = this.getGoodsQty()
            if ( goodsOnPageQty > allGoodsQty ) {
                return allGoodsQty
            } else {
                return goodsOnPageQty
            }
        },

    },
    methods: {
        getGoodsQty () {
            return this.$store.getters.goods_qty
        },
        getGoodsOnPageQty () {
            return this.$store.getters.goods_on_page_qty
        },
    }

}
</script>
