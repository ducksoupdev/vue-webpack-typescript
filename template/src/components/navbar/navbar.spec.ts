import Vue from 'vue';
import VueRouter from 'vue-router';
import Component from 'vue-class-component';
import Sinon from 'sinon';
import {expect} from 'chai';
import {ComponentTest, MockLogger} from '../../util/component-test';
import { NavbarComponent } from './navbar';

let loggerSpy = Sinon.spy();

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

  before(() => {
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

  it('should render correct contents', async () => {
    directiveTest.createComponent({ router: router });

    await directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
      expect(loggerSpy).toHaveBeenCalledWith('Default object property!');
      expect(vm.$el.querySelectorAll('ul.nav li').length).toBe(3);
    });
  });

  describe('When clicking the about link', () => {
    beforeEach(async () => {
      directiveTest.createComponent({ router: router });

      await directiveTest.execute((vm) => {
        let anchor = <HTMLAnchorElement>vm.$el.querySelector('ul.nav li a[href="#/about"]');
        anchor.click();
      });
    });

    it('should render correct about contents', async () => {
      await directiveTest.execute((vm) => {
        expect(vm.$el.querySelector('div.about').textContent).toEqual('About');
      });
    });
  });

  describe('When clicking the list link', () => {
    beforeEach(async () => {
      directiveTest.createComponent({ router: router });

      await directiveTest.execute((vm) => {
        let anchor = <HTMLAnchorElement>vm.$el.querySelector('ul.nav li a[href="#/list"]');
        anchor.click();
      });
    });

    it('should render correct about contents', async () => {
      await directiveTest.execute((vm) => {
        expect(vm.$el.querySelector('div.list').textContent).toEqual('List');
      });
    });
  });

});
