import { Component, Vue } from 'vue-property-decorator'
import axios, { AxiosResponse } from 'axios'
import bContainer from 'bootstrap-vue/es/components/layout/container'
import bCol from 'bootstrap-vue/es/components/layout/col'
import bRow from 'bootstrap-vue/es/components/layout/row'

interface UserResponse {
  id: string
  name: string
}

@Component({
  template: require('./list.html'),
  components: {
    'b-container': bContainer,
    'b-col': bCol,
    'b-row': bRow
  }
})
export class ListComponent extends Vue {

  items: UserResponse[] = []
  protected axios
  private url = 'https://jsonplaceholder.typicode.com/users'

  constructor () {
    super()
    this.axios = axios
  }

  mounted () {
    this.$nextTick(() => {
      this.loadItems()
    })
  }

  private loadItems () {
    if (!this.items.length) {
      this.axios.get(this.url).then((response: AxiosResponse) => {
        this.items = response.data
      }, (error) => {
        console.error(error)
      })
    }
  }
}
