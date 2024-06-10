<template>
    <div class="body_wrap">
        <BackToTop />
        <HeaderComponent />
        <main>
            <DefaultBreadCrumbs pageName="Вопросы" />
            <section class="checkout_section mt-5">
                <div class="container">
                    <div class="form_area">
                        <div class="checkout_widget bg-light">
                            <!-- <h3 class="checkout_widget_title">Billing Details</h3> -->
                            <h2 class="details_item_title">
                                Как зарегистрировать аккаунт?
                            </h2>
                            <h5 class="mt-3 mb-3">
                                Для организаций:
                            </h5>
                            <p>
                                По вопросам регистрации напишите письмо в произвольной форме на адрес  <a href="mailto:admin@avtobm21.ru">admin@avtobm21.ru</a> с указанием:
                            </p>
                            <ul class="info_list">
                                <li>Наименование Организации </li>
                                <li>ИНН организации </li>
                                <li>Электронную почту (которая будет являться логином для входа на сайт и получателем всех сообщений, например: «счет на оплату» и т.д.)</li>
                            </ul>
                            <h5 class="mt-3 mb-3">
                                Для частных лиц:
                            </h5>
                            <p class="">
                                Работа с частными лицами пока не поддерживается (В Разработке)
                            </p>

                            <h2 class="details_item_title mt-5">
                                Как оформить заказ ?
                            </h2>
                            <p class="mt-3 mb-3">
                                Заказ можно оформить только после регистрации и авторизации на сайте
                            </p>
                            <p>
                                Не авторизированные пользователи заказы оформлять не смогут
                            </p>
                            <p>
                                После оформления заказа с Вами свяжется менеджер, подтвердит статус заказа и вышлет все необходимые документы на Ваш адрес электронной почты
                            </p>

                            <h2 class="details_item_title mt-5">
                                Доставка товаров
                            </h2>
                            <p>
                                На данный момент доставка не осуществляется (В разработке)
                            </p>
                            <p>
                                Самовывоз можно осуществить по согласованию с менеджеров с данных адресов:
                            </p>
                            <ul class="info_list">
                                <li>г. Белгород ул. Студенческая, 21г</li>
                                <li>г. Белгород ул. Студенческая, 38</li>
                                <li>г. Белгород Михайловское шоссе 19</li>
                            </ul>
                            <p>
                                График работы пунктов выдачи Пн-Пт с 8-00 до 17-00
                            </p>

                            <h5 class="mt-5">
                                По вопросам работы сайта <br>
                                обращаться на электронную почту <a href="mailto:admin@avtobm21.ru">admin@avtobm21.ru</a><br>
                                или в телеграмм канал <a target="_blank" href="https://telegram.me/Avtobm21">https://t.me/Avtobm21</a>
                            </h5>
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
    name: "FaqView",
    components: {
        HeaderComponent,
        BackToTop,
        FooterComponent,
        DefaultBreadCrumbs
    },
    mounted () {
        window.scrollTo({
            top: 200,
            behavior: 'smooth'
        })
    },
    watch: {
        $route: {
            immediate: true,
            handler () {
                document.title = 'Часто задаваемые вопросы'
            }
        }
    },
}
</script>