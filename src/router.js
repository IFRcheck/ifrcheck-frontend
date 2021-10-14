import { createRouter, createWebHistory } from 'vue-router';
import IfrList from './components/IFR/IfrList';
import SearchView from './components/SearchView';

const routes = [
    {
        path: '/', component: SearchView
    },
    {
        path: '/viewAll', component: IfrList
    },
    {
        path: '/:catchAll(.*)', component: SearchView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;