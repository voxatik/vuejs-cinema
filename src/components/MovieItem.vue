<template>
    <div class="movie">
        <div class="movie-col-left">
            <img :src="movie.Poster" :alt="movie.Title">
        </div>        
        <div class="movie-col-right">
            <div class="movie-title">
                <h2>{{ movie.Title }}</h2>
                <span class="movie-rating">{{ movie.Rated }}</span>
            </div>
            <p>
                movie times
            </p>
        </div>        
    </div>
</template>

<script>
export default {
    props: ['item'],
    data() {
        return {
            id: this.item.id,
            movie: this.item.movie
        }
    },
}
</script>
