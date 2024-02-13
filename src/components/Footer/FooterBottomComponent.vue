<template>
    <div class="footer_bottom">
      <div class="container">
        <div class="row align-items-center">
          <div class="col col-md-6">
            <p class="copyright_text">
              <a href="https://themeforest.net/user/web-thunder">WebThunder</a> © <b>Getyootech</b> Template. All rights reserved Copyrights 2023
            </p>
          </div>

          <div class="col col-md-6">
            <div class="payment_method">
              <h4>Payment:</h4>
              <img :src="payments_icon" alt="Getyootech - Gadgets Ecommerce Site Template">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>

import payments_icon from "@/assets/images/payments_icon.webp"

export default {
    name: 'FooterBottomComponent',
    data () {
        return {
            payments_icon
        }
    }
}
</script>
<style scoped>

</style>