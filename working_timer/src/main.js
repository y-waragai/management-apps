import Vue from 'vue';
import moment from 'moment-timezone';
import VueLocalStorage from 'vue-localstorage';
import App from './App.vue';

Vue.prototype.$moment = moment;
Vue.use(VueLocalStorage);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
