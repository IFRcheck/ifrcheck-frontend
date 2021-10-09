import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
	namespaced: true,
	state() {
		return {
			itemCount: 0,
			items: [],
			sortBy: "infections",
			sortOrder: "DESC",
			totalItem: []
		};
	},
	mutations,
	actions,
	getters
};
