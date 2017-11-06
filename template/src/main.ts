import Vue from 'vue';
import VueRouter from 'vue-router';

import './sass/main.scss';

import { HomeComponent } from './components/home';
import { AboutComponent } from './components/about';
import { ListComponent } from './components/list';
import { NavbarComponent } from './components/navbar';

import { createRouter } from './router';

new Vue({
  el: '#app-main',
  router: createRouter(),
  components: {
    'navbar': NavbarComponent
  }
});
