<template>
    <div id="movie-filter">
        <h2>Filter Results</h2>
        <div class="filter-group">
            <check-filter v-for="genre in genres" 
                          :key="genre" 
                          :title="genre">
            </check-filter>
        </div>
    </div>
</template>

<script>
import CheckFilter from '@/CheckFilter.vue'
import genres from '../util/genres'
export default {
    data() {
        return {
            genres
        }
    },
    components: {
        CheckFilter
    }
}
</script>
