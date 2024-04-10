<template>
<PreloaderComponent v-if="advertisementsListLoading" />
<div v-if="advertisementObject" class="container">
    <div class="row">
        <div class="col col-lg-6">
            <div class="product_details_image">
                <div class="details_image_carousel">
                    <div class="slider_item">
                        <img v-if="image" :src="image" alt="{{ advertisementObject.name }}">
                        <img v-else :src="AdvPreview" alt="{{ advertisementObject.name }}">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="product_details_content">
                <h2 class="adv_title">{{ advertisementObject.name }}</h2>
                <p>
                    {{ advertisementObject.description  }}
                </p>
                <div class="item_price">
                    <span>Цена: </span>
                    <span class="adv_price">{{ advertisementObject.price }} &#8381;</span>
                </div>
            </div>
        </div>
    </div>
    <div class="details_information_tab">
        <ul class="tabs_nav nav ul_li" role="tablist">
            <li role="presentation">
                <button class="active" data-bs-toggle="tab" data-bs-target="#description_tab" type="button" role="tab" aria-controls="description_tab" aria-selected="true">
                Характеристики
                </button>
            </li>
        </ul>
        <AdvItemPropertiesComponent 
            :properties="advertisementObject.properties"
        ></AdvItemPropertiesComponent>
    </div>
</div>
</template>

<script>
import {backendPath} from "@/main.js"
import AdvPreview from "@/assets/images/advertisement_preview.png"
import PreloaderComponent from '@/components/PreloaderComponent.vue'
import AdvItemPropertiesComponent from '@/components/Main/AdvertisementItem/AdvItemPropertiesComponent.vue'

export default {
    name: 'GoodContentComponent',
    data () {
        return {
            AdvPreview,
        }
    },
    components: {
        PreloaderComponent,
        AdvItemPropertiesComponent
    },
    computed: {
        id () {
            return this.$route.params.id
        },
        advertisementObject () {
            return this.$store.getters.getAdvertisementsById(this.id)
        },
        advertisementsListLoading () {
            return this.$store.getters.advertisementsListLoading
        },
        image () {
            let path = ''
            if (this.advertisementObject.mainImage) {
                path = backendPath + this.advertisementObject.mainImage.url
            } else {
                if (this.advertisementObject.images.length > 0) {
                    path = backendPath + this.advertisementObject.images[0].image.url
                }
            }
            return path
        }
    },
    methods: {
        setPageTitle(payload) {
            document.title = payload
        },
    },
    watch: {
        advertisementObject: {
            deep: true,
            handler() {
                this.setPageTitle(this.advertisementObject.name)
            }  
        }
    }
}    
</script>