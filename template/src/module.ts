import {RouteConfig} from 'vue-router';

const homeComponent = () => import('./components/home').then(({HomeComponent}) => HomeComponent);
const aboutComponent = () => import('./components/about').then(({AboutComponent}) => AboutComponent);
const listComponent = () => import('./components/list').then(({ListComponent}) => ListComponent);


export function createRoutes(prefix: string = ''): RouteConfig[] {
  return [
    {
      path: prefix + '/',
      component: homeComponent,
    },
    {
      path: prefix + '/about',
      component: aboutComponent,
    },
    {
      path: prefix + '/list',
      component: listComponent,
    }
  ];
}
