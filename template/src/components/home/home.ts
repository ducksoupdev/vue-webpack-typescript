import * as Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    template: require('./home.html')
})
export class HomeComponent extends Vue {

    package: string = 'vue-typescript-seed';
    repo: string = 'https://github.com/ducksoupdev/vue-typescript-seed';

}
