<template>
    <div id="day-select">
        <ul class="days">
            <li class="day"
                :class="{'active': isActive(day)}"
                @click="changeDay(day)" 
                v-for="day in days" :key="day">
                {{ formatDay(day) }}
            </li>
        </ul>
    </div>
</template>

<script>
import moment from '../util/moment'

export default {
    data() {
        let day = moment()
        return {
            today: day,
            selected: day,
            days: [0,1,2,3,4,5,6].map(num => moment().add(num, 'days'))
        }
    },
    methods: {
        formatDay(day) {
            if(day.isSame(this.today, 'day')) {
                return 'Today'
            }

            return day.format('ddd MM/DD')
        },
        changeDay(day) {
            this.selected = day
            this.$root.$emit('day-changed', day)
        },
        isActive(day) {
            return day.isSame(this.selected, 'day')
        },
    },
    computed: {
    }
}
</script>
