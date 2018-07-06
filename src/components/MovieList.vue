<template>
    <div id="movie-list">
        <template v-if="filteredMovies.length">
            <movie-item v-for="item in filteredMovies" 
                        :key="item.id"
                        :id="item.id"
                        :movie="item.movie">
                <div class="movie-sessions">
                    <div class="session-time-wrapper">
                        <span class="session-time"
                            v-for="session in filterSessions(item.sessions)"
                            :key="session.id">
                            {{ formatTime(session) }}
                        </span>
                    </div>
                </div>
            </movie-item>
        </template>
        <div class="no-results" v-else>
            {{ noResults }}
        </div>
    </div>
</template>

<script>
import genres from '../util/genres'
import times from '../util/times'
import moment from '../util/moment'
import MovieItem from '@/MovieItem.vue'

export default {
    props: [ 'movies'],
    created() {
        this.$root.$on('filter-genre', this.filterGenre)
        this.$root.$on('filter-time', this.filterTime)
        this.$root.$on('day-changed', day => this.day = day)
    },
    data() {
        return {
            genreFilters: [],
            timeFilters: [],
            day: moment()
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
        },
        passesTimeFilter({time}) {
            time = moment(time)
            if(! this.day.isSame(time, 'day')) {
                return false
            }
           
            if(! this.timeFilters.length || this.timeFilters.length === 2) {
                return true
            }

            if(this.timeFilters[0] === times.BEFORE_6PM) {
                return time.hour() < 18
            } else {
                return time.hour() >= 18
            }
            
        },
        passesGenreFilter(movie) {
            if(! this.genreFilters.length) {
                return true
            }

            let genres = movie.Genre.split(', '), 
                matched = false
            
            genres.forEach(g => {
                if(this.genreFilters.includes(g)) {
                    matched = true
                } 
            })

            return matched
        },
        filterSessions(sessions) {
            return sessions.filter(this.passesTimeFilter)
        },
        formatTime({time}) {
            return moment(time).format('h:mm A')
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
            return this.movies.filter(({movie}) => this.passesGenreFilter(movie))
                .filter( ({sessions}) => sessions.find(this.passesTimeFilter))
                
        },
        noResults() {
            let filters = this.timeFilters.concat(this.genreFilters).join(', ')
            return `No results for ${filters}.`
        }
    },
    components: {
        MovieItem
    }
}
</script>
