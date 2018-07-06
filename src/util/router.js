import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/MainPage.vue'
import DetailPage from '@/DetailPage.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: "/", name: "main", component: MainPage
    },
    {
        path: "/movie/:id", name: "movie", component: DetailPage
    },
    { path: "*", redirect: {name: "main"}}
    
]

const config = {
    //mode: 'history',
    routes
}
const router = new VueRouter(config)

export default router