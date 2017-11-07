import Vue from 'vue';
import VueRouter from 'vue-router';

import './sass/main.scss';
import {NavbarComponent} from './components/navbar';

import {createRoutes} from './module';


// register the plugin
Vue.use(VueRouter);
const router = new VueRouter({mode: 'history', routes: createRoutes()});

new Vue({
  el: '#app-main',
  router,
  components: {
    'navbar': NavbarComponent
  }
});
