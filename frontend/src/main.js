import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import DatetimePicker from 'vuetify-datetime-picker'


Vue.use(DatetimePicker)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  DatetimePicker,
  render: h => h(App)
}).$mount('#app')

