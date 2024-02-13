<template>
  <footer class="footer_section">
    <div class="footer_widget_area">
      <div class="container">
        <div class="row">
          <div class="col col-lg-4 col-md-6 col-sm-6">
            <FooterAboutComponent />
          </div>
          <div class="col col-lg-2 col-md-3 col-sm-6">
            <QuickLinksComponent />
          </div>
          <div class="col col-lg-2 col-md-3 col-sm-6">
            <CustomAreaComponent />
          </div>
          <div class="col col-lg-4 col-md-6 col-sm-6">
            <ContactInfoComponent />
          </div>
        </div>
      </div>
    </div>
    <FooterBottomComponent />
  </footer>
 </template>
   
 <script>

import FooterAboutComponent from '@/components/Footer/FooterAboutComponent.vue'
import QuickLinksComponent from '@/components/Footer/QuickLinksComponent.vue'
import CustomAreaComponent from '@/components/Footer/CustomAreaComponent.vue'
import ContactInfoComponent from '@/components/Footer/ContactInfoComponent.vue'
import FooterBottomComponent from '@/components/Footer/FooterBottomComponent.vue'

export default {
  name: 'FooterComponent',
  components: {
    FooterAboutComponent,
    QuickLinksComponent,
    CustomAreaComponent,
    ContactInfoComponent,
    FooterBottomComponent,
  }
}
</script>
 
<style scoped>
</style>
   