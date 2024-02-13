<template>
    <div class="footer_widget footer_about">
        <LogoComponent />
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <ul class="social_round ul_li">
            <li><a href="#!"><i class="icofont-youtube-play"></i></a></li>
            <li><a href="#!"><i class="icofont-instagram"></i></a></li>
            <li><a href="#!"><i class="icofont-twitter"></i></a></li>
            <li><a href="#!"><i class="icofont-facebook"></i></a></li>
            <li><a href="#!"><i class="icofont-linkedin"></i></a></li>
        </ul>
    </div>
</template>
<script>
import LogoComponent from '@/components/Header/LogoComponent.vue';

export default {
    name: 'FooterAboutComponent',
    components: {
        LogoComponent,
    }
}
</script>
<style scoped>

</style>