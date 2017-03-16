<template>
    <div>
        <h2>Demo1</h2>
        <button @click="e => getData(e)">Get</button>
        <ul>
            <li v-for="(item, k) in citys">{{ item }}  <a href="#" @click.stop="del(k)">删除</a></li>
        </ul>
        <p v-if="citysCount">共 {{citysCount}} 条数据</p>
        <hr>
        <h2>Demo2</h2>
        <router-link to="/tree">tree</router-link>
    </div>
</template>
<script>
export default {
    methods: {
        getData(e) {
            // arrow functions in v-on handlers
            // console.log(e)
            this.$store.dispatch('getCitys')
        },
        del(k) {
            this.$store.dispatch('deleteCity', k)
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
