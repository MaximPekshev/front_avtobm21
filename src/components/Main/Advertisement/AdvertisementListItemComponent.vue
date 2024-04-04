<template>
    <div class="bolg_standard">
        <router-link  :to="{ name: 'advertisement', params: { id: id }}" class="item_image">
            <img v-if="image" :src="image" alt="{{ name }}">
            <img v-else :src="AdvPreview" alt="{{ name }}">
        </router-link>
        <div class="item_content">
            <h3 class="item_title">
                <router-link  :to="{ name: 'advertisement', params: { id: id }}">{{ name }}</router-link>
            </h3>
            <h3 class="item_title">
                <router-link  :to="{ name: 'advertisement', params: { id: id }}">Цена: {{ price }}</router-link>
            </h3>
            <p>
                {{ description }}
            </p>
            <router-link  :to="{ name: 'advertisement', params: { id: id }}" class="btn btn_gray">Подробнее</router-link>
        </div>
    </div>
</template>

<script>
import {backendPath} from "@/main.js"
import AdvPreview from "@/assets/images/advertisement_preview.png"

export default {
    name: 'AdvertisementListItemComponent',
    props: ['advertisementInfo'],
    data () {
        return {
            AdvPreview,
            id: this.advertisementInfo.id,
            name: this.advertisementInfo.name,
            price: Math.floor(this.advertisementInfo.price),
            description: this.advertisementInfo.description,
            mainImage: this.advertisementInfo.image,
            images: this.advertisementInfo.images
        }
    },
    computed: {
        image () {
            let path = ''
            if (this.mainImage) {
                path = backendPath + this.mainImage
            } else {
                if (this.images.length > 0) {
                    path = backendPath + this.images[0].image.url
                }
            }
            return path
        }
    }
}
</script>