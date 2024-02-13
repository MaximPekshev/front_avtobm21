<template>
    <div class="breadcrumb_section">
        <div class="container">
            <ul class="breadcrumb_nav ul_li">
                <li><router-link to="/">Домой</router-link></li>
                <li>{{ pageName }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: "DefaultBreadCrumbs",
    props: [
        'pageName',
    ]
}
</script>



