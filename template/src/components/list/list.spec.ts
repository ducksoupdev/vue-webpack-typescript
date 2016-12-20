import * as Vue from 'vue';
import {ComponentTest} from '../../util/component-test';

describe('List component', () => {
    // ensure component is loaded into webpack
    // modules loaded using es6 imports (as above) that are not used are removed through transpilation
    let listComponent = require('./list');

    let directiveTest: ComponentTest;
    let listComponentInjector: any;

    beforeEach(() => {
        listComponentInjector = require('inject-loader!./list'); // load the module from the webpack bundle

        let mockListComponent = listComponentInjector({
            axios: {
                get: () => {
                    return Promise.resolve({ data: [{ name: 'test 1' }, { name: 'test 2' }, { name: 'test 3' }] });
                }
            }
        }).ListComponent;

        directiveTest = new ComponentTest('<div><list></list></div>', { 'list': mockListComponent });
    });

    it('should render correct contents', (done) => {
        directiveTest.createComponent();
        setTimeout(() => {
            directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
                expect(vm.$el.querySelectorAll('ul li').length).toBe(3);
                done();
            });
        }, 50);
    });
});
