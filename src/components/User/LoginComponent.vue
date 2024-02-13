<template>
    <section class="register_section section_space">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7"> 
                    <div class="register_wrap tab-content">
                        <div class="tab-pane fade active show" role="tabpanel">
                            <div>
                                <div class="form_item_wrap">
                                    <h3 class="input_title">Email*</h3>
                                    <div class="form_item">
                                        <label for="email_input"><i class="fas fa-at"></i></label>
                                        <input 
                                            v-model="inputEmail" 
                                            type="text" 
                                            placeholder="Email" 
                                            id="email_input"
                                            :class="activeClass"
                                        >
                                        <span v-if="message">{{ message }}</span>
                                    </div>
                                    
                                </div>
                                <div v-if="pinCodeSended" class="form_item_wrap">
                                    <h3 class="input_title">Код подтверждения*</h3>
                                    <div class="form_item">
                                        <label for="pincode_input"><i class="fas fa-lock"></i></label>
                                        <input 
                                            v-model="inputPinCode"
                                            class="as-pin-code"
                                            id="pincode_input" 
                                            type="text" 
                                            name="pincode_input" 
                                            v-pincode
                                        />
                                        <span v-if="authMessage">{{ authMessage }}</span>
                                    </div>
                                </div>
                                <div v-if="loading" class="text-center">
                                    <button type="submit" class="btn btn_secondary" >
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    </button>
                                </div>
                                <div v-else class="text-center">
                                    <button v-if="pinCodeSended" @click="pinCodeAuth" type="submit" class="btn btn_secondary">
                                        Подтвердить
                                    </button>
                                    <button v-else @click="requestForPinCode" type="submit" class="btn btn_secondary">
                                        Получить КОД
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    name: "LoginComponent",
    data () {
        return {
            inputEmail: "",
            inputPinCode: "",
            message: "",
            authMessage: "",
            pinCodeSended: false,
            loading: false,
        }
    },
    computed: {
        isValidEmail() {
            return /^[^@]+@\w+(\.\w+)+\w$/.test(this.inputEmail)
        },
        activeClass () {
            let activeClass = ''
            if (this.isValidEmail) {
                activeClass = 'as-success'
            } else {
                activeClass = 'as-error'
            }
            if (this.inputEmail=="") {
                activeClass = ''
            }
            return activeClass
        },
    },
    methods: {
        requestForPinCode () {
            this.message = ''
            this.authMessage = ''
            if (this.isValidEmail) {
                if (!this.pinCodeSended) {
                    let url = `https://back.avtobm21.ru/auth/get-pin/?recipient=${this.inputEmail}`
                    this.loading = true
                    axios
                        .get(url)
                        .then(() => {
                            this.pinCodeSended = true
                        })
                        .catch(error => {
                            console.log(error);
                        })
                        .finally(() => (this.loading = false));
                }
            } else {
                this.message = 'Указан не корректный Email'
            }
        },
        pinCodeAuth () {
            this.message = ''
            this.authMessage = ''
            if (this.isValidEmail) {
                if (this.inputPinCode.length == 6) {
                    let url = `https://back.avtobm21.ru/auth/get-token/`
                    let data = {
                        "username": this.inputEmail,
                        "pincode": this.inputPinCode
                    }
                    this.loading = true
                    axios({
                        method: 'post',
						mode: 'same-origin',
						headers: {
							'Content-Type': 'multipart/form-data',
						},
						url: url,
						data: data,
                    }).then(response => {
                        if (response.data.data!=null) {
                            this.$store.dispatch('setUserToken', response.data.data.token)
                            this.$router.push({name: 'userAccount'})
                        } else {
                            this.authMessage = "Введен не корректный ПИН КОД!"
                        }
                    }).catch(error => {
                        console.log(error);
                    }).finally(() => (this.loading = false));
                } else {
                    this.message = 'Указан не корректный ПИН КОД'
                }
            } else {
                this.message = 'Указан не корректный Email'
            }
        }
    },
    directives: {
        pincode: {
            mounted(el) {
                el.oninput = function(e) {
                    if (!e.isTrusted) {
                        return
                    }
                    const x = this.value.replace(/[^0-9]/g, '').match(/(\d{0,6})/)
                    this.value = x[1]
                    el.dispatchEvent(new Event('input'))
                }
            }
        }
    }
}
</script>