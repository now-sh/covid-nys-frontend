import "bootswatch/dist/darkly/bootstrap.min.css";
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueRouter from 'vue-router';
import bootstrap from 'bootstrap';
import BootstrapVue from 'bootstrap-vue';
import IconsPlugin from 'bootstrap-vue';

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
