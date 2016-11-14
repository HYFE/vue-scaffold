<template>
    <div>
        <button @click="getData">Get</button>
        <ul>
            <li v-for="item in citys">{{ item }}</li>
        </ul>
        <p v-if="citysCount">共 {{citysCount}} 条数据</p>
    </div>
</template>
<script>
export default {
    methods: {
        getData() {
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
