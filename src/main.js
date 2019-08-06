import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import { sync } from 'vuex-router-sync'
import './setup/debug'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(firestorePlugin)

sync(store, router)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
