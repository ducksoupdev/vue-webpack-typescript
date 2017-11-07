import Vue from 'vue';
import VueRouter from 'vue-router';

import './sass/main.scss';
import {routes} from './module';
import {NavbarComponent} from './components/navbar';

// register the plugin
Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'history',
  routes: routes('')
});

new Vue({
  el: '#app-main',
  router: router,
  components: {
    'navbar': NavbarComponent
  }
});
