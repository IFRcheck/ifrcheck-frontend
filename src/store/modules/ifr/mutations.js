export default {
	setItemCount(state, payload) {
		state.itemCount = payload.count;
	},
	setTotalItem(state, payload) {
		state.totalItem = payload.totalItem;
	},
	setInitialItems(state, payload) {
		state.items = payload.items;
	},
	appendItems(state, payload) {
		let list = state.items;
		let newList = list.concat(payload.items);
		state.items = newList;
	},
	setSortBy(state, payload) {
		state.sortBy = payload;
	},
	setSortOrder(state, payload) {
		state.sortOrder = payload;
	},
};
