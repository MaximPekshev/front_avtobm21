<template>
    <div class="footer_widget footer_contact">
        <!-- <h3 class="footer_widget_title text-uppercase">Contact Info</h3> -->
        <div class="hotline_wrap">
            <div class="footer_hotline">
                <div class="item_icon">
                    <i class="icofont-headphone-alt"></i>
                </div>
                <div class="item_content">
                    <h4 class="item_title">Есть вопросы?</h4>
                    <span class="hotline_number">8 (800) 505-65-21</span>
                </div>
            </div>
            <div class="livechat_btn clearfix">
                <a class="btn border_primary" target="_blank" href="https://t.me/Avtobm21"><img :src="telegram"></a>
            </div>
        </div>
    </div>
</template>

<script>

import app_store from "@/assets/images/app_store.webp"
import play_store from "@/assets/images/play_store.webp"
import telegram from "@/assets/images/logo/telegram-1.svg"

export default {
    name: 'ContactInfoComponent',
    data () {
        return {
            app_store,
            play_store,
            telegram
        }
    }
}
</script>

<style scoped>

</style>