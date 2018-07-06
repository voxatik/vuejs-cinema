<template>
    <div id="movie-filter">
        <h2>Filter Results</h2>
        <div class="filter-group">
            <h3>By time</h3>
            <check-filter v-for="time in times"
                          :key="time" 
                          category="time" 
                          :title="time">
            </check-filter>
        </div>
        <div class="filter-group">
            <h3>By genre</h3>
            <check-filter v-for="genre in genres" 
                          :key="genre"
                          category="genre" 
                          :title="genre">
            </check-filter>
        </div>
    </div>
</template>

<script>
import CheckFilter from '@/CheckFilter.vue'
import genres from '../util/genres'
import times from '../util/times'

export default {
    data() {
        return {
            genres,
            times
        }
    },
    components: {
        CheckFilter
    }
}
</script>
