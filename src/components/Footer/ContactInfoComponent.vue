<template>
    <div class="footer_widget footer_contact">
        <h3 class="footer_widget_title text-uppercase">Contact Onfo</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. 
        </p>
        <div class="hotline_wrap">
            <div class="footer_hotline">
                <div class="item_icon">
                    <i class="icofont-headphone-alt"></i>
                </div>
                <div class="item_content">
                    <h4 class="item_title">Have any question?</h4>
                    <span class="hotline_number">(+880)1680636189</span>
                </div>
            </div>
            <div class="livechat_btn clearfix">
                <a class="btn border_primary" href="#!">Live Chat</a>
            </div>
        </div>
        <ul class="store_btns_group ul_li">
            <li><a href="#!"><img :src="app_store" alt="app_store"></a></li>
            <li><a href="#!"><img :src="play_store" alt="play_store"></a></li>
        </ul>
    </div>
</template>

<script>

import app_store from "@/assets/images/app_store.webp"
import play_store from "@/assets/images/play_store.webp"

export default {
    name: 'ContactInfoComponent',
    data () {
        return {
            app_store,
            play_store
        }
    }
}
</script>

<style scoped>

</style>