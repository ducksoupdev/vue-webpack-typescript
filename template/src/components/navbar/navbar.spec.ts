import Vue from 'vue';
import VueRouter from 'vue-router';
import Component from 'vue-class-component';
import {ComponentTest, MockLogger} from '../../util/component-test';
import {ILogger} from '../../util/log';
import { NavbarComponent } from './navbar';

let loggerSpy = jasmine.createSpy('loggerInfo');

@Component({
    template: require('./navbar.html')
})
class MockNavbarComponent extends NavbarComponent {
  constructor() {
    super();
    this.logger = new MockLogger(loggerSpy);
  }
}

describe('Navbar component', () => {
    let directiveTest: ComponentTest;
    let router: VueRouter;

    beforeAll(() => {
        Vue.use(VueRouter);
        directiveTest = new ComponentTest('<div><navbar></navbar><router-view>loading...</router-view></div>', { 'navbar': MockNavbarComponent });

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
            expect(loggerSpy).toHaveBeenCalledWith('Default object property!');
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
