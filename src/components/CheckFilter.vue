<template>
    <div class="check-filter" :class="{active: checked}" @click="setCheck">
        <span class="checkbox"></span>
        <span class="check-filter-title">{{ title }}</span>
</template>

<script>
export default {
    props: [
        'title'
    ],
    data() {
        return {
            checked: false
        }
    },
    methods: {
        setCheck() {
            this.checked = ! this.checked
            this.$root.$emit('filter-genre', this.title, this.checked)
        }
    }
}
</script>
