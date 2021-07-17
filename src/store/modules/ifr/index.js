import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            itemCount: 0,
            items: []
        };
    },
    mutations,
    actions,
    getters
};