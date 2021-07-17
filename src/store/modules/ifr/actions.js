import axios from 'axios'

export default {
    async getItemCount(context) {
        try {
            const baseURL = process.env.VUE_APP_API_URL;
            const url = `${baseURL}getCount`;

            let response = await axios.get(url);
            let count = response.data[0].count

            context.commit('setItemCount', {count})
        } catch(error) {
            console.log('error', error);
        }
    },
    async getItems(context) {
        try {
            const baseURL = process.env.VUE_APP_API_URL;
            //let itemsList = context.rootGetters['ifr/items'];
            //const offset = itemsList.length;
            //const limit = process.env.VUE_APP_LIST_BLOCK_SIZE;
            //const url = `${baseURL}getData?argument=1 LIMIT ${limit} OFFSET ${offset}`;
            const url = `${baseURL}getData?argument=1`;

            let response = await axios.get(url);
            let items = response.data;
            context.commit('setItems', {items})

        } catch(error) {
            console.log('error', error);
        }
    }
};