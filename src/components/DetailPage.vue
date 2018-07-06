<template>
   <div id="detail" v-if="ready">
       <movie-item :id="item.id" :movie="item.movie">
           <div class="movie-details">
               <p class="movie-genre">{{item.movie.Genre }}</p>
               <p class="movie-plot">{{item.movie.Plot }}</p>
               <table>
                   <tr>
                       <td>Release Date:</td>
                       <td>{{ item.movie.Released }}</td>
                   </tr>
                   <tr>
                       <td>Run Time:</td>
                       <td>{{ item.movie.Runtime }}</td>
                   </tr>
                   <tr>
                       <td>Director</td>
                       <td>{{ item.movie.Director }}</td>
                   </tr>
                   <tr>
                       <td>Cast</td>
                       <td>{{ item.movie.Actors }}</td>
                   </tr>
               </table>
            </div>
       </movie-item>
       <div class="home">
           <router-link :to="{name: 'main'}">Back to list</router-link>
       </div>
   </div>
</template>

<script>
import MovieItem from '@/MovieItem.vue'

export default {
    created() {
        if(! this.movies ) {
            this.$root.$emit('load-movies')
        }
    },
    computed: {
        item() {
            if(! this.movies) {
                return null
            }

            return this.movies.find(item => item.id === this.$route.params.id) || null
        },
        movies() {
            return this.$parent.movies
        },
        ready() {
            return this.movies && this.item
        }
    },
    components: {
        MovieItem
    }

}
</script>
