<template>
    <div class="row">
        <div v-for="item in advertisementListQty" v-bind:key="item.id" class="col col-md-4 col-sm-4">
            <div class="bolg_standard">
                <div class="wl-demo"></div>
                <div class="item_content">
                    <h3 class="item_title">
                        <div class="wl-demo"></div>
                    </h3>
                    <h3 class="item_title">
                        <div class="wl-demo"></div>
                    </h3>
                    <div class="wl-demo"></div>
                    <div class="wl-demo"></div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
    import AdvPreview from "@/assets/images/advertisement_preview.png"

    export default {
        name: 'AdvertisementListDemo',
        props: ['advertisementListQty'],
        data () {
            return {
                AdvPreview,
                qty: this.advertisementListQty,
            }
        },
    }
</script>
