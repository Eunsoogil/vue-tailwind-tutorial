import {createRouter, createWebHashHistory} from 'vue-router'
import PageViewer from './views/PageViewer.vue'
import CreatePage from './views/CreatePage.vue'
import Pages from './views/Pages.vue'
import PagesList from './views/PagesList.vue'
import PageEdit from './views/PageEdit.vue'
import PageHome from './views/PageHome.vue'

const router = createRouter({
    // to use # at url, not recommended
    // # will not provide to server
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: PageHome},
        // props true -> send url parameters inside component
        { path: '/:index?', component: PageViewer, props: true },
        { 
            path: '/pages', 
            component: Pages,
            children: [
                { path: '', component: PagesList },
                { path: 'create', component: CreatePage },
                { path: ':index/edit', component: PageEdit, props: true },
            ]
        },
    ]
})

export default router