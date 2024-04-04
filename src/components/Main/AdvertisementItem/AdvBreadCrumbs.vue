<template>
    <div class="breadcrumb_section">
        <div class="container">
            <ul class="breadcrumb_nav ul_li">
                <li><router-link to="/">Домой</router-link></li>
                <li>Автомобили в продаже</li>
                <li>{{ name }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdvBreadCrumbs',
    computed: {
        name () {
            if (this.advertisementObject()) {
                return this.advertisementObject().name
            } else {
                return ""
            }
        },
    },
    methods: {
        advertisementObject () {
            return this.$store.getters.getAdvertisementsById(this.$route.params.id)
        },
    }
}
</script>