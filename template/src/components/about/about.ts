import * as Vue from 'vue';
import Component from 'vue-class-component';
import {Logger} from '../../util/log';

@Component({
    template: require('./about.html')
})
export class AboutComponent extends Vue {

    private logger: Logger;
    repo: string = 'https://github.com/ducksoupdev/vue-typescript-seed';

    mounted() {
        if (!this.logger) this.logger = new Logger();
        this.$nextTick(() => this.logger.info('about is ready!'));
    }
}
