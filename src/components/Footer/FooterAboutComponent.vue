<template>
    <div class="footer_widget footer_about">
        <LogoComponent />
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
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