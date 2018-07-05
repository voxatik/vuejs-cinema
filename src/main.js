import Vue from 'vue'

import './style.scss'


import MovieList from '@/MovieList.vue'
import MovieFilter from '@/MovieFilter.vue'

new Vue({
    el: '#app',
    components: {
        MovieList,
        MovieFilter
    }
})