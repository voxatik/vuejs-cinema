<template>
    <div id="movie-list">
        <movie-item v-for="movie in filteredMovies" :key="movie.id" :item="movie" ></movie-item>
    </div>
</template>

<script>
import genres from '../util/genres'
import axios from 'axios'
import MovieItem from '@/MovieItem.vue'

export default {
    mounted() {
        axios.get('/api').then(({data}) => { 
            this.movies = data
        })
        this.$root.$on('filter-genre', this.filterGenre)
        this.$root.$on('filter-time', this.filterTime)
    },
    data() {
        return {
            movies: [],
            genreFilters: [],
            timeFilters: []
        }
    },
    methods: {
        filterGenre(title, checked) {
            this.adjustFilters(this.genreFilters, title, checked)
        },
        filterTime(title, checked) {
            this.adjustFilters(this.timeFilters, title, checked)
        },
        adjustFilters(filter, title, checked) {
            if(checked) {
                filter.push(title)
            } else {
                let index = filter.indexOf(title)
                if(index > -1) {
                    filter.splice(index, 1)
                }
            }
        }
    },
    computed: {
        hasFilters() {
            return !! (this.genreFilters.length || this.timeFilters.length)
        },
        filteredMovies() {
            if(! this.hasFilters) {
                return this.movies
            }
            return this.movies.filter(({movie}) => {
                let genres = movie.Genre.split(', '), 
                    matched = false

                genres.forEach(g => {
                    if(this.genreFilters.includes(g)) {
                        matched = true
                    } 
                })

                return matched
            })
        }
    },
    components: {
        MovieItem
    }
}
</script>
