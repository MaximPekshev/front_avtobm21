<template>
    <div class="footer_widget footer_about">
        <LogoComponent />
        <p>
            ОГРН: 1043107001684 ИНН: 3123102015 <br>
            КПП: 312301001 Юр. адрес: 308002, г. <br>
            Белгород, ул. Студенческая, д. 21 г
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