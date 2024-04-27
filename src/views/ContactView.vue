<template>
  <div class="body_wrap">
    <BackToTop />
    <HeaderComponent />
    <main>
      <DefaultBreadCrumbs pageName="Котакты" />
      <section class="contact_section mt-5">
          <div class="container">
            <div class="row">
              <div class="col col-lg-12">
                <div class="row contact_info_wrap">
                  <div class="col col-md-4 mb-5 p-5">
                    <h3 class="ml-5">ООО "Автоград"</h3>
                    <ul class="ul_li_block">
                          <li>Адрес:</li>
                          <li style="padding-left: 15px; margin-bottom: 15px;"><i style="color: #f03d3f" class="fa-solid fa-location-dot"></i> <b> 308023, ул. Студенческая, 21г</b></li>
                          <li>Телефон:</li>
                          <li style="padding-left: 15px; margin-bottom: 15px;"><i style="color: #f03d3f" class="fa-solid fa-mobile"></i> <b> 8 (800) 505-65-21</b></li>
                          <li>Email:</li>
                          <li style="padding-left: 15px; margin-bottom: 15px;"> <i style="color: #f03d3f" class="fa-solid fa-at"></i> <b> kamaz@kamazcenter.ru</b></li>
                        </ul>
                  </div>
                  <div class="map_section col col-md-8 mb-5">
                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A746359e3bbfa2a5f9991b9a964c51d54da65b3d1c971ed6300c6cec114ed1c40&amp;source=constructor" width="100%" height="600" frameborder="0"></iframe>
                  </div>
                </div>

                <div class="contact_info_wrap">
                  <div class="cart_table">
                    <table class="table">
                      <thead>
                        <tr>
                          <th class="backgroundGrey">Подразделение</th>
                          <th class="text-center backgroundGrey">Адрес, телефон</th>
                          <th class="text-center backgroundGrey">Время работы</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Бюро закупок и продаж автомобилей и спецтехники</td>
                          <td >ул. Студенческая, 21г <br>тел: +7(4722) 36-03-30</td>
                          <td class="text-center">Пн-Пт с 8-00 до 17-00</td>
                        </tr>
                        <tr>
                          <td class="backgroundGrey">Фирменный магазин оригинальных запчастей КАМАЗ (розница )</td>
                          <td class="backgroundGrey">ул. Студенческая, 38 <br>тел: +7(4722) 40-20-05</td>
                          <td class="text-center backgroundGrey">Пн-Пт с 8-00 до 19-00 <br> Сб-Вс с 9-00 до 17-00</td>
                        </tr>
                        <tr>
                          <td>Отдел сервисного и гарантийного обслуживания автомобилей</td>
                          <td >ул. Студенческая, 21г <br>тел: +7(4722) 20-59-21</td>
                          <td class="text-center">Пн-Вс с 8-00 до 20-00</td>
                        </tr>
                        <tr>
                          <td class="backgroundGrey">Бюро закупок и продаж запасных частей</td>
                          <td class="backgroundGrey">ул. Студенческая, 21г <br>тел: +7(4722) 20-59-21</td>
                          <td class="text-center backgroundGrey">Пн-Пт с 8-00 до 17-00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import BackToTop from '@/components/BackToTop.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
import DefaultBreadCrumbs from '@/components/DefaultBreadCrumbs.vue'

export default {
  name: 'HomeView',
  components: {
    HeaderComponent,
    BackToTop,
    FooterComponent,
    DefaultBreadCrumbs,
  },
  watch: {
      $route: {
          immediate: true,
          handler() {
              document.title = 'Контакты'
          }
      },
  }
}
</script>
