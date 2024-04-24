import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import App from './App.vue'
import router from './router'
import 'default-passive-events'
import { VueReCaptcha } from 'vue-recaptcha-v3'
/* plugins */
import { errorHandler as customErrorHandler } from '@/plugins/error-handler'
import quasarUserOptions from '@/plugins/quasar-user-options'
/* globalCss setting */
import '@/assets/styles/index.less'

const app = createApp(App)

/* setup config */
app.config.errorHandler = customErrorHandler

app.use(VueReCaptcha, {
  siteKey: '6Lcdm6spAAAAABthqdw16Nw8ozlka6ATMfHqcRQJ',
  loaderOptions: {
    useRecaptchaNet: true
  }
})

app.use(router)

app.use(createPinia())

app.use(Quasar, quasarUserOptions)

app.mount('#app')
