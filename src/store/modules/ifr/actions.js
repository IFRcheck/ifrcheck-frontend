import axios from 'axios';

export default {
	async getItemCount(context) {
		try {
			const baseURL = process.env.VUE_APP_API_URL;
			const url = `${baseURL}getCount`;

			let response = await axios.get(url);
			let count = response.data[0].count;

			context.commit('setItemCount', { count });
		} catch (error) {
			console.log('error', error);
		}
	},
	setSortBy(context, sortBy) {
		context.commit('setSortBy', sortBy);
	},
	setSortOrder(context, sortOrder) {
		context.commit('setSortOrder', sortOrder);
	},
	async getItems(context, initial) {
		try {
			let maxItems = context.rootGetters['ifr/itemCount'];
			const baseURL = process.env.VUE_APP_API_URL;
			let itemsList = context.rootGetters['ifr/items'];
			let offset;
			if (initial) {
				offset = 0;
			} else {
				offset = itemsList.length;
			}
			const limit = process.env.VUE_APP_LIST_BLOCK_SIZE;
			let sortBy = context.rootGetters['ifr/getSortBy'];
			let sortOrder = context.rootGetters['ifr/getSortOrder'];

			if (offset > maxItems) return;

			const url = `${baseURL}getData?order=${sortBy} ${sortOrder}&argument=country != "Total" LIMIT ${limit} OFFSET ${offset}`;

			const total = `${baseURL}getData?order=${sortBy} ${sortOrder}&argument=country = "Total"`;

			let totalResponse = await axios.get(total);
			let response = await axios.get(url);
			let totalItem = totalResponse.data;
			let items = response.data;
			if (items !== 'No entries.') {
				if (initial) {
					context.commit('setTotalItem', { totalItem });
					context.commit('setInitialItems', { items });
				} else {
					context.commit('appendItems', { items });
				}
			}
		} catch (error) {
			console.log('error', error);
		}
	},
};
