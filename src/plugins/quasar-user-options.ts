import 'quasar/dist/quasar.css'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import lang from 'quasar/lang/zh-TW.js'
import { Cookies, Loading, Notify, QSpinnerPuff } from 'quasar'

// TODO style setting
export default {
  config: {
    brand: {
      /* Customization color class setup for HRDS */
      primary: '#0099FF',
      secondary: '#005EB8'
    },
    //UIBlock Loading的圖示
    loading: {
      spinner: QSpinnerPuff,
      spinnerColor: 'primary'
    }
  },
  plugins: {
    Cookies,
    Loading,
    Notify
  },
  lang: lang,
  component: ['QCarousel', 'QCarouselSlide', 'QCarouselControl']
}
