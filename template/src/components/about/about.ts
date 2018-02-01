import { Component, Vue } from 'vue-property-decorator'
import bContainer from 'bootstrap-vue/es/components/layout/container'
import bCol from 'bootstrap-vue/es/components/layout/col'
import bRow from 'bootstrap-vue/es/components/layout/row'
import { Logger } from '../../util/log'

@Component({
  template: require('./about.html'),
  components: {
    'b-container': bContainer,
    'b-col': bCol,
    'b-row': bRow
  }
})
export class AboutComponent extends Vue {

  repo: string = 'https://github.com/ducksoupdev/vue-webpack-typescript'
  protected logger: Logger

  mounted () {
    if (!this.logger) this.logger = new Logger()
    this.$nextTick(() => this.logger.info('about is ready!'))
  }
}
