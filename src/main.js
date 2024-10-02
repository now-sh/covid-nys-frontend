import Vue from 'vue';
import App from './App.vue';
import store from './store';
import "bootstrap";
import "../node_modules/bootswatch/dist/darkly/bootstrap.min.css";
import "jquery";
import "popper.js"

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
