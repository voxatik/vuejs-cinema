import Vue from 'vue'
import './style.scss'
import router from './util/router'
import axios from 'axios'

new Vue({
    el: '#app',
    router,
    data: {
        movies: []
    },
    created() {
        this.loadMovies()
        this.$root.$on('load-movies', this.loadMovies)

    },
    methods: {
        loadMovies() {
            axios.get('/api').then(({data}) => { 
                this.movies = data
            })
        }
    }
})