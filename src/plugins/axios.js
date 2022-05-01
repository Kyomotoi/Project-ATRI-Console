import axios from 'axios'

const Axios = {
    install: function (Vue) {
        Vue.axios = axios;
        Object.defineProperties(Vue.prototype, {
            axios: {
                get() {
                    return axios;
                },
            },
            $axios: {
                get() {
                    return axios;
                },
            },
        });
    }
}

export default Axios;
