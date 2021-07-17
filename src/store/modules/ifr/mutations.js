export default {
    setItemCount(state, payload) {
        state.itemCount = payload.count;
    },
    setItems(state, payload) {
        state.items = payload.items;
    }
};