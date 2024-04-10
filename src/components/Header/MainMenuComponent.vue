<template>
    <nav class="main_menu navbar navbar-expand-lg">
        <div class="main_menu_inner collapse navbar-collapse justify-content-center" id="main_menu_dropdown">
            <ul class="main_menu_list ul_li">
                <li><router-link to="/">Домой</router-link></li>
                <li><router-link :to="{ name: 'catalog', query:{page:1}}">Каталог</router-link></li>
                <li><router-link to="/contact">Контакты</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'MainMenuComponent',
}
</script>

<style>
</style>