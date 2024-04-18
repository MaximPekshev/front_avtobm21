<template>
<PreloaderComponent v-if="advertisementsListLoading" />
<div v-if="advertisementObject" class="container">
    <div class="row">
        <div class="col col-lg-6">
            <div v-if="images" class="product_details_image">
                <div class="details_image_carousel">
                    <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                        <Slide v-for="slide in images" :key="slide">
                            <div class="carousel__item">
                                <img 
                                    v-fullscreen-image="{
                                        imageUrl: images,
                                        withDownload: false,
                                        animation: 'blur'
                                    }"
                                 :src="slide"
                                />
                            </div>
                        </Slide>
                    </Carousel>
                    <Carousel
                        id="thumbnails"
                        :items-to-show="itemsToShow"
                        :wrap-around="true"
                        v-model="currentSlide"
                        ref="carousel"
                    >   
                        <Slide v-for="(slide, index) in images" :key="slide">
                            <div class="carousel__item"><img style="cursor: pointer;" @click="slideTo(index)" class="p-2" :src="slide"></div>
                        </Slide>
                    </Carousel>
                </div>
            </div>
            <div v-else class="product_details_image">
                <div class="slider_item">
                    <img :src="AdvPreview">
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
                    <span class="adv_price">{{ Math.floor(advertisementObject.price).toLocaleString() }} &#8381;</span>
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
import { Carousel, Slide } from 'vue3-carousel'
import {backendPath} from "@/main.js"
import AdvPreview from "@/assets/images/advertisement_preview.png"
import PreloaderComponent from '@/components/PreloaderComponent.vue'
import AdvItemPropertiesComponent from '@/components/Main/AdvertisementItem/AdvItemPropertiesComponent.vue'
import 'vue3-carousel/dist/carousel.css'

export default {
    name: 'GoodContentComponent',
    data () {
        return {
            AdvPreview,
            currentSlide: 0,
        }
    },
    components: {
        PreloaderComponent,
        AdvItemPropertiesComponent,
        Carousel,
        Slide,
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
        images () {
            let advImagesList = []
            if (this.advertisementObject.image) {
                advImagesList.push((backendPath + this.advertisementObject.image.url))
            }
            this.advertisementObject.images.forEach((img) => {
                advImagesList.push(backendPath + img.image.url)
            })
            return advImagesList
        },
        itemsToShow () {
            if (this.images.length > 3) {
                return 3
            } else {
                return this.images.length
            }
        }
    },
    methods: {
        setPageTitle(payload) {
            document.title = payload
        },
        slideTo(val) {
            this.currentSlide = val
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