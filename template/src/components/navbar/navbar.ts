import { Collapse, Dropdown } from 'uiv'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Link } from './link'
import { Logger } from '../../util/log'

@Component({
  template: require('./navbar.html'),
  components: {
    collapse: Collapse
  }
})
export class NavbarComponent extends Vue {

  inverted: boolean = true
  showNavbar = false
  object: { default: string } = { default: 'Default object property!' }
  links: Link[] = [
    new Link('Home', '/'),
    new Link('About', '/about'),
    new Link('List', '/list')
  ]

  protected logger: Logger

  @Watch('$route.path')
  pathChanged () {
    this.logger.info('Changed current path to: ' + this.$route.path)
  }

  mounted () {
    if (!this.logger) this.logger = new Logger()
    this.$nextTick(() => this.logger.info(this.object.default))
  }
}
