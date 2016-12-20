import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import {ComponentTest} from '../../util/component-test';
import {ILogger} from '../../util/log';

describe('Navbar component', () => {
    // ensure component is loaded into webpack
    // modules loaded using es6 imports (as above) that are not used are removed through transpilation
    let navbarComponent = require('./navbar');

    let directiveTest: ComponentTest;
    let navbarComponentInjector: any;
    let router: VueRouter;
    let infoLoggerSpy = jasmine.createSpy('loggerInfo');

    class MockLogger implements ILogger {
        info(msg: any) {
            infoLoggerSpy(msg);
        }

        warn(msg: any) {
            infoLoggerSpy(msg);
        }

        error(msg: any) {
            infoLoggerSpy(msg);
        }
    }

    beforeAll(() => {
        Vue.use(VueRouter);

        navbarComponentInjector = require('inject-loader!./navbar'); // load the module from the webpack bundle

        let mockNavbarComponent = navbarComponentInjector({
            '../../util/log': { Logger: MockLogger }
        }).NavbarComponent;

        directiveTest = new ComponentTest('<div><navbar></navbar><router-view>loading...</router-view></div>', { 'navbar': mockNavbarComponent });

        let homeComponent = { template: '<div class="home">Home</div>' };
        let aboutComponent = { template: '<div class="about">About</div>' };
        let listComponent = { template: '<div class="list">List</div>' };

        router = new VueRouter({
            routes: [
                {path: '/', component: homeComponent},
                {path: '/about', component: aboutComponent},
                {path: '/list', component: listComponent}
            ]
        });
    });

    it('should render correct contents', (done) => {
        directiveTest.createComponent({ router: router });

        directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
            expect(infoLoggerSpy).toHaveBeenCalledWith('Default object property!');
            expect(vm.$el.querySelectorAll('ul.nav li').length).toBe(3);
            done();
        });
    });

    describe('When clicking the about link', () => {
        beforeEach((done) => {
            directiveTest.createComponent({ router: router });
            directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
                let anchor = <HTMLAnchorElement>vm.$el.querySelector('ul.nav li a[href="#/about"]');
                anchor.click();
                done();
            });
        });

        it('should render correct about contents', (done) => {
            directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
                expect(vm.$el.querySelector('div.about').textContent).toEqual('About');
                done();
            });
        });
    });

    describe('When clicking the list link', () => {
        beforeEach((done) => {
            directiveTest.createComponent({ router: router });
            directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
                let anchor = <HTMLAnchorElement>vm.$el.querySelector('ul.nav li a[href="#/list"]');
                anchor.click();
                done();
            });
        });

        it('should render correct about contents', (done) => {
            directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
                expect(vm.$el.querySelector('div.list').textContent).toEqual('List');
                done();
            });
        });
    });

});
