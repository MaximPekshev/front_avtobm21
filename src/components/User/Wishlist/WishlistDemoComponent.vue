<template>
    <div class="cart_table">
        <table class="table mb-0">
            <thead>
            <tr>
                <th>Товар</th>
                <th class="text-center">Цена</th>
                <th class="text-center">Наличие</th>
                <th class="text-center">В корзину</th>
                <th class="text-center">Удалить</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="item in demoContentCount" v-bind:key="item.id">
                    <td><div class="wl-demo"></div></td>
                    <td><div class="wl-demo"></div></td>
                    <td><div class="wl-demo"></div></td>
                    <td><div class="wl-demo"></div></td>
                    <td><div class="wl-demo"></div></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    name: 'WishlistItemComponent',
    props: ['demoCount'],
    data () {
        return {
            demoContentCount: this.demoCount,
        }
    }
}
</script>