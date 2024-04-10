<template>
    <tbody>
        <tr v-for="item in demoContent" v-bind:key="item.id">
            <td><div class="wl-demo"></div></td>
            <td><div class="wl-demo"></div></td>
            <td><div class="wl-demo"></div></td>
            <td><div class="wl-demo"></div></td>
        </tr>
    </tbody>
</template>

<script>
export default {
    name: "OrderListItemDemoContent",
    props: ["demoContent"],
}
</script>