import Vue from 'vue'

window.axios = require('axios');

import router from './router';
import store from "./store";

window.$ = window.jQuery = require('jquery');
window._ = require('lodash');

import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import LazyLoadDirective from "./directives/lazyload.js";

Vue.directive("lazyload", LazyLoadDirective);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
