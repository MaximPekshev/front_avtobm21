<template>
    <tbody>
        <tr v-for="item in demoContentCount" v-bind:key="item.id">
            <td><div class="wl-demo"></div></td>
            <td><div class="wl-demo"></div></td>
        </tr>
    </tbody>
</template>

<script>
export default {
    name: "OrderListDemoContent",
    props: ["demoCount"],
    data () {
        return {
            demoContentCount: this.demoCount,
        }
    }
}
</script>