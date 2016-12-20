import * as Vue from 'vue';
import Component from 'vue-class-component';
import * as axios from 'axios';

interface UserResponse {
    id: string;
    name: string;
}

@Component({
    template: require('./list.html')
})
export class ListComponent extends Vue {

    items: UserResponse[] = [];
    private url = 'https://jsonplaceholder.typicode.com/users';

    mounted() {
        this.$nextTick(() => {
            this.loadItems();
        });
    }

    private loadItems() {
        if (!this.items.length) {
            axios.get(this.url).then((response: Axios.AxiosXHR<UserResponse[]>) => {
                this.items = response.data;
            }, (error) => {
                console.error(error);
            });
        }
    }
}
