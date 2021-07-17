import { createStore } from 'vuex';

import ifrModule from './modules/ifr/index'

const store = createStore({
    modules: {
        ifr: ifrModule,
    }
});

export default store;