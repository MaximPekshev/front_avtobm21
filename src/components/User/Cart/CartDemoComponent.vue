<template>
    <section class="cart_section section_space">
        <div class="container">
            <div class="cart_update_wrap">
                <!-- <p class="mb-0"><i class="fal fa-check-square"></i> Shipping costs updated.</p> -->
            </div>
            <div class="cart_table">
                <table class="table mb-0">
                    <thead>
                    <tr>
                        <th>Товар</th>
                        <th class="text-center">Цена</th>
                        <th class="text-center">Количество</th>
                        <th class="text-center">Сумма</th>
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
        </div>
    </section>
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