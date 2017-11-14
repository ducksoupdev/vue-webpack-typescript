import Vue from 'vue';
import VueRouter from 'vue-router';
import { makeHot, reload } from './util/hot-reload';
import { createRouter } from './router';

const navbarComponent = () => import('./components/navbar').then(({ NavbarComponent }) => NavbarComponent);
// const navbarComponent = () => import(/* webpackChunkName: 'navbar' */'./components/navbar').then(({ NavbarComponent }) => NavbarComponent);

import './sass/main.scss';

if (process.env.ENV === 'development' && module.hot) {
  const navbarModuleId = './components/navbar';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(navbarModuleId, navbarComponent,
    module.hot.accept('./components/navbar', () => reload(navbarModuleId, (<any>require('./components/navbar')).NavbarComponent)));
}

new Vue({
  el: '#app-main',
  router: createRouter(),
  components: {
    'navbar': navbarComponent
  }
});
