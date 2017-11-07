import RouteConfig from 'vue-router';
import {HomeComponent} from './components/home';
import {AboutComponent} from './components/about';
import {ListComponent} from './components/list';

const routesList = [
  {path: '/', component: HomeComponent},
  {path: '/about', component: AboutComponent},
  {path: '/list', component: ListComponent},
];

/**
 *
 * @param {string} [prefix]
 * @returns RouteConfig[]}
 */
export function routes(prefix: string = '') {
  return routesList.map(route => ({
    ...route,
    path: prefix + route.path
  }));
}
