export default {
    setItemCount(state, payload) {
        state.itemCount = payload.count;
    },
    setItems(state, payload) {
        let list = state.items;
        let newList = list.concat(payload.items);
        state.items = newList;
    }
};
