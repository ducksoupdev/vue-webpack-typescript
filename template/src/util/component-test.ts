import Vue from 'vue';
import {SinonSpy} from 'sinon';
import merge from 'lodash.merge';
import { ILogger } from './log';

export interface IComponents {
  [key: string]: Vue.Component;
}

interface IExecuteCallback {
  (vm: Vue): void;
}

export interface IComponentTest {
  createComponent(createOptions?: any): void;
  execute(callback: IExecuteCallback): void;
}

export class ComponentTest implements IComponentTest {

  public vm: Vue;

  constructor(private template: string, private components: IComponents) {
  }

  public createComponent(createOptions?: any): void {
    let options = {
      template: this.template,
      components: this.components
    };
    if (createOptions) merge(options, createOptions);
    this.vm = new Vue(options).$mount();
  }

  public execute(callback: IExecuteCallback): void {
    Vue.nextTick(callback.bind(this, this.vm));
  }

}

export class MockLogger implements ILogger {

  constructor(private loggerSpy: SinonSpy) {
  }

  info(msg: any) {
    this.loggerSpy(msg);
  }

  warn(msg: any) {
    this.loggerSpy(msg);
  }

  error(msg: any) {
    this.loggerSpy(msg);
  }
}
