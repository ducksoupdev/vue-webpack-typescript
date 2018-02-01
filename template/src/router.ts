import Vue from 'vue'
import VueRouter, { Location, Route, RouteConfig } from 'vue-router'{{#hotReload}}
import { makeHot, reload } from './util/hot-reload'{{/hotReload}}

const homeComponent = () => import('./components/home').then(({ HomeComponent }) => HomeComponent)
const aboutComponent = () => import('./components/about').then(({ AboutComponent }) => AboutComponent)
const listComponent = () => import('./components/list').then(({ ListComponent }) => ListComponent)
// const homeComponent = () => import(/* webpackChunkName: 'home' */'./components/home').then(({ HomeComponent }) => HomeComponent)
// const aboutComponent = () => import(/* webpackChunkName: 'about' */'./components/about').then(({ AboutComponent }) => AboutComponent)
// const listComponent = () => import(/* webpackChunkName: 'list' */'./components/list').then(({ ListComponent }) => ListComponent)
{{#hotReload}}
if (process.env.ENV === 'development' && module.hot) {
  const homeModuleId = './components/home'
  const aboutModuleId = './components/about'
  const listModuleId = './components/list'

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(homeModuleId, homeComponent,
    module.hot.accept('./components/home', () => reload(homeModuleId, (require('./components/home') as any).HomeComponent)))

  makeHot(aboutModuleId, aboutComponent,
    module.hot.accept('./components/about', () => reload(aboutModuleId, (require('./components/about') as any).AboutComponent)))

  makeHot(listModuleId, listComponent,
    module.hot.accept('./components/list', () => reload(listModuleId, (require('./components/list') as any).ListComponent)))
}
{{/hotReload}}

Vue.use(VueRouter)

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: homeComponent
  },
  {
    path: '/about',
    component: aboutComponent
  },
  {
    path: '/list',
    component: listComponent
  }
]

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() })
