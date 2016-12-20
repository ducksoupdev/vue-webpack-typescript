import * as Vue from 'vue';
import * as merge from 'lodash.merge';

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
