import Vue from 'vue';
import VueRouter, { Location, Route, RouteConfig } from 'vue-router';

const homeComponent = () => import('./components/home').then(({ HomeComponent }) => HomeComponent);
const aboutComponent = () => import('./components/about').then(({ AboutComponent }) => AboutComponent);
const listComponent = () => import('./components/list').then(({ ListComponent }) => ListComponent);

Vue.use(VueRouter);

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: homeComponent,
  },
  {
    path: '/about',
    component: aboutComponent,
  },
  {
    path: '/list',
    component: listComponent,
  }
];

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() });
