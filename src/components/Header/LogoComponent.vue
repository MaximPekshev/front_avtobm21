<template>
    <div class="brand_logo">
        <router-link class="brand_link" to="/">
            <img :src="mainLogo" alt="Getyootech - Gadgets Ecommerce Site Template">
        </router-link>
    </div>
</template>
<script>

import mainLogo from '@/assets/images/logo/site_logo.svg';

export default {
    name: 'LogoComponent',
    data () {
        return {
            mainLogo,
        }
    }
}
</script>
<style scoped>
</style>