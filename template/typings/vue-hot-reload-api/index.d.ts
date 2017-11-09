declare module 'vue-hot-reload-api' {
  import Vue, { Component } from 'vue';
  export function install(Vue): void;
  export function compatible(): boolean;
  export function createRecord(id: string, component: Component): void;
  export function reload(id: string, component: Component): void;
}
