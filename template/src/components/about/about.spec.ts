import * as Vue from 'vue';
import {ComponentTest} from '../../util/component-test';
import {ILogger} from '../../util/log';

describe('About component', () => {
    // ensure component is loaded into webpack
    // modules loaded using es6 imports (as above) that are not used are removed through transpilation
    let aboutComponent = require('./about');

    let directiveTest: ComponentTest;
    let aboutComponentInjector: any;
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

    beforeEach(() => {
        aboutComponentInjector = require('inject-loader!./about'); // load the module from the webpack bundle

        let mockAboutComponent = aboutComponentInjector({
            '../../util/log': { Logger: MockLogger }
        }).AboutComponent;

        directiveTest = new ComponentTest('<div><about></about></div>', { 'about': mockAboutComponent });
    });

    it('should render correct contents', (done) => {
        directiveTest.createComponent();
        directiveTest.execute((vm) => {
            expect(vm.$el.querySelector('.repo-link').getAttribute('href')).toBe('https://github.com/ducksoupdev/vue-typescript-seed');
            expect(infoLoggerSpy).toHaveBeenCalledWith('about is ready!');
            done();
        });
    });
});
