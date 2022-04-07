export default {
	itemCount(state) {
		return state.itemCount;
	},
	items(state) {
		let countries = state.items;
		let total = state.totalItem;
		if (total !== undefined) {
			return total.concat(countries);
		}
		return countries;
	},
	getSortBy(state) {
		return state.sortBy;
	},
	getSortOrder(state) {
		return state.sortOrder;
	},
};
