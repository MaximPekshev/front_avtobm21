<template>
    <div class="tab-pane fade" id="documents_tab" role="tabpanel">
        <div class="row">
            <div v-if="specificationUrl" class="col">
                <a :href="specificationUrl" target="_blank" type="submit" class="btn btn_primary">Спецификация</a>
            </div>
            <div v-if="businessOfferUrl" class="col mt-3">
                <a :href="businessOfferUrl" target="_blank" type="submit" class="btn btn_primary">Коммерческое предложение</a>
            </div>
        </div>
    </div>
</template>

<script>
import {backendPath} from "@/main.js"
export default {
    name: "AdvItemDocumentsComponent",
    props: ['businessOffer', 'specification'],
    component: {
    },
    computed: {
        businessOfferUrl () {
            let path = ''
            if (this.businessOffer) {
                path = backendPath + this.businessOffer
            }
            return path
        },
        specificationUrl () {
            let path = ''
            if (this.specification) {
                path = backendPath + this.specification
            }
            return path
        },
    }

}
</script>