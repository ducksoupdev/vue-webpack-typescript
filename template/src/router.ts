import Vue from 'vue';
import VueRouter, { Location, Route, RouteConfig } from 'vue-router';
import { makeHot, reload } from './util/hot-reload';

interface IRouteComponentConfiguration {
  componentName: string;
  componentPath: string;
  urlPath: string;
}

const routeComponentConfigurationList: IRouteComponentConfiguration[] = [
  {
    'componentName': 'HomeComponent',
    'componentPath': './components/home',
    'urlPath': '/'
  },
  {
    'componentName': 'AboutComponent',
    'componentPath': './components/about',
    'urlPath': '/about'
  },
  {
    'componentName': 'ListComponent',
    'componentPath': './components/list',
    'urlPath': '/list'
  },
];

let routeComponentList = [];

routeComponentConfigurationList.forEach((routeComponentConfiguration: IRouteComponentConfiguration) => {
  // add empty string is necessary to get import to work
  let routeComponent = {
    'component': () => import('' + routeComponentConfiguration.componentPath).then((Component) => Component[routeComponentConfiguration.componentName]),
    'path': routeComponentConfiguration.urlPath
  };
  
  routeComponentList.push(routeComponent);
  if (process.env.ENV === 'development' && module.hot) {
    makeHot(routeComponentConfiguration.componentPath, routeComponent.component,
      module.hot.accept(routeComponentConfiguration.componentPath, () => reload(routeComponentConfiguration.componentPath, (<any>require(routeComponentConfiguration.componentPath))[routeComponentConfiguration.componentName])));
  }
});

Vue.use(VueRouter);

export const createRoutes: () => RouteConfig[] = () => routeComponentList;

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() });
