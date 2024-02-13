<template>
    <nav class="main_menu navbar navbar-expand-lg">
        <div class="main_menu_inner collapse navbar-collapse justify-content-center" id="main_menu_dropdown">
            <ul class="main_menu_list ul_li">
                <!-- <li class="active dropdown">
                    <a class="nav-link" href="#" id="home_submenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">Home</a>
                    <ul class="dropdown-menu" aria-labelledby="home_submenu">
                        <li class="active"><a href="index_1.html.htm">Home V.1</a></li>
                        <li><a href="index_2.html.htm">Home V.2</a></li>
                        <li><a href="index_3.html.htm">Home V.3</a></li>
                    </ul>
                </li> -->
                <li><router-link to="/">Домой</router-link></li>
                <li><router-link :to="{ name: 'catalog', query:{page:1}}">Каталог</router-link></li>
                <!-- <li class="dropdown">
                    <a class="nav-link" href="#" id="blog_submenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Blog
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="blog_submenu">
                        <li><a href="blog.html.htm">Blog Standard</a></li>
                        <li><a href="blog_grid.html.htm">Blog 2 Column</a></li>
                        <li><a href="blog_masonry.html.htm">Blog Masonry</a></li>
                        <li><a href="blog_list.html.htm">Blog List Layout</a></li>
                        <li><a href="blog_details.html.htm">Blog Details</a></li>
                    </ul>
                </li> -->
                <!-- <li class="dropdown">
                    <a class="nav-link" href="#" id="pages_submenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Pages
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="pages_submenu">
                        <li><a href="about.html.htm">About Us</a></li>
                        <li><a href="team.html.htm">Team</a></li>
                        <li><a href="account.html.htm">My Account</a></li>
                        <li><a href="register.html.htm">Register</a></li>
                        <li><a href="error.html.htm">404 Error</a></li>
                    </ul>
                </li> -->
                <li><router-link to="/contact">Контакты</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'MainMenuComponent',
    // methods: {
    //     goToCatalog: function() {
    //         this.$router.push('catalog')
    //     }
    // }
}
</script>

<style>
</style>