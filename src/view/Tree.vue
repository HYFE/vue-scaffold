<template>
    <tree :data="data"></tree>
</template>
<script>
import Tree from 'components/tree'

export default {
    components: {
        Tree
    },
    data() {
        return {
            data: [{
                key: 1,
                value: '全国',
                childs: [{
                    key: 2,
                    value: '河南',
                    childs: [{
                        key: 3,
                        value: '郑州',
                        childs: [{
                            key: 4,
                            value: '金水区'
                        },
                        {
                            key: 5,
                            value: '中原区'
                        },
                        {
                            key: 6,
                            value: '郑东新区'
                        }]
                    }, {
                        key: 7,
                        value: '洛阳'
                    }]
                }, {
                    key: 8,
                    value: '河北'
                }]
            }]
        }
    }
}
</script>
