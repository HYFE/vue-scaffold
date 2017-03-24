<template>
    <div>
        <template
            v-if="data instanceof Array"
            v-for="item in data">
            <tree-item :data="item"></tree-item>
        </template>
        <tree-item v-else :data="data"></tree-item>
    </div>
</template>
<script>
import TreeItem from './Item'

export default {
    components: {
        TreeItem
    },
    props: {
        data: [Object, Array]
    },
    methods: {

    }
}
</script>
