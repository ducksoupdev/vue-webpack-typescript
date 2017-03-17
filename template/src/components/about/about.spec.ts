import Vue from 'vue';
import Component from 'vue-class-component';
import { ComponentTest, MockLogger } from '../../util/component-test';
import { ILogger } from '../../util/log';
import { AboutComponent } from './about';

let loggerSpy = jasmine.createSpy('loggerInfo');

@Component({
    template: require('./about.html')
})
class MockAboutComponent extends AboutComponent {
  constructor() {
    super();
    this.logger = new MockLogger(loggerSpy);
  }
}

describe('About component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><about></about></div>', { 'about': MockAboutComponent });
  });

  it('should render correct contents', (done) => {
    directiveTest.createComponent();
    directiveTest.execute((vm) => {
      expect(vm.$el.querySelector('.repo-link').getAttribute('href')).toBe('https://github.com/ducksoupdev/vue-webpack-typescript');
      expect(loggerSpy).toHaveBeenCalledWith('about is ready!');
      done();
    });
  });
});
