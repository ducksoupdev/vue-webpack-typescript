import {HomeComponent} from './home';
import {ComponentTest} from '../../util/component-test';

describe('Home component', () => {
    let directiveTest: ComponentTest;

    beforeEach(() => {
        directiveTest = new ComponentTest('<div><home></home></div>', { 'home': HomeComponent });
    });

    it('should render correct contents', () => {
        directiveTest.createComponent();
        expect(directiveTest.vm.$el.querySelector('.package').textContent).toBe('vue-webpack-typescript');
    });
});
