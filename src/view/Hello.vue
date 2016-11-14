<template>
    <div>
        <button @click="getData">Get</button>
        <ul>
            <li v-for="item in citys">{{ item }}</li>
        </ul>
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
            return this.$store.getters.citys
        }
    }
}
</script>
