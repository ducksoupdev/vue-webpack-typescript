import * as Vue from 'vue';
import * as VueRouter from 'vue-router';

import { HomeComponent } from './components/home/home';
import { AboutComponent } from './components/about/about';
import { ListComponent } from './components/list/list';
import { NavbarComponent } from './components/navbar/navbar';

// register the plugin
Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    { path: '/', component: HomeComponent },
    { path: '/about', component: AboutComponent },
    { path: '/list', component: ListComponent },
  ]
});

new Vue({
  el: '#app-main',
  router: router,
  components: {
    'navbar': NavbarComponent
  }
});
