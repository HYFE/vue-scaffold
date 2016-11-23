<template>
    <div>
        <button @click="e => getData(e)">Get</button>
        <ul>
            <li v-for="item in citys">{{ item }}</li>
        </ul>
        <p v-if="citysCount">共 {{citysCount}} 条数据</p>
    </div>
</template>
<script>
export default {
    methods: {
        getData(e) {
            // arrow functions in v-on handlers
            // console.log(e)
            this.$store.dispatch('getCitys')
        }
    },
    computed: {
        citys() {
            return this.$store.state.citys
        },
        citysCount() {
            return this.$store.getters.citysCount
        }
    }
}
</script>
