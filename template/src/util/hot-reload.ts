import Vue, { Component } from 'vue';
import * as api from 'vue-hot-reload-api';

export const isHot = () => module.hot;

export async function makeHot(id: string, componentLoader: () => Promise<Component>, acceptFunc: void) {
  if (isHot()) {
    api.install(Vue);
    if (!api.compatible) {
      throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.');
    }

    const loadedComponent = await componentLoader();
    api.createRecord(id, loadedComponent);
  }
}

export function reload(id: string, component: Component) {
  api.reload(id, component);
}
