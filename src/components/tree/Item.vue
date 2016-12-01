<template>
    <div class="tree-item">
        <div class="tree-item-content" @click="onClick">
            <i class="tree-item-arrow"
                :class="{ placeholder: !hasChilds, active: expand}"></i>
            <label class="tree-item-checkbox">
                <input type="checkbox" @change="onCheck($event.target.checked)" ref="checkbox">
                <span class="tree-item-check-icon"></span>
            </label>
            <span class="tree-item-text">{{data.value}}</span>
        </div>
        <div class="tree-item-childs"
            ref="childs"
            v-if="hasChilds"
            :class="{ show: expand}"
            :style="{ maxHeight : expand ? childHeight + 'px' : 0}"
            @transitionend="onExpanded"
            @transitionstart="onStartExpand">
            <tree-item :data="item"
                :parent-checks="checks"
                :level="level + 1"
                @on-check="onChildCheck"
                v-for="item in data.childs"></tree-item>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TreeItem',
    props: {
        data: Object,
        parentChecks: Array,
        level: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            childHeight: 0,
            expand: false,
            checked: false,
            value: {},
            checks: []
        }
    },
    methods: {
        onCheck(checked, isNotPass) {
            this.checks = checked && this.data.childs ? this.data.childs.map(item => item.key) : []
            !isNotPass && this.$emit('on-check', this.data.key, checked)
        },
        onChildCheck(key, childChecked) {
            if (childChecked) {
                this.checks.push(key)
            } else {
                const index = this.checks.indexOf(key)
                index !== -1 && this.checks.splice(index, 1)
            }
            console.log('child', this.checks)
            const checked = this.checks.length === this.data.childs.length
            this.$refs.checkbox.checked = checked
            console.log(this.level, checked)
            this.level > 0 && this.$emit('on-check', this.data.key, checked)
        },
        onClick() {
            this.expand = !this.expand
        },
        onStartExpand() {
            this.$refs.childs.style.maxHeight = this.childHeight + 'px'
        },
        onExpanded() {
            this.$refs.childs.removeAttribute('style')
        }
    },
    computed: {
        hasChilds() {
            return this.data.childs && this.data.childs.length > 0
        }
    },
    watch: {
        parentChecks(checks) {
            const checked = checks.indexOf(this.data.key) !== -1
            if (this.$refs.checkbox.checked !== checked) {
                this.$refs.checkbox.checked = checked
                this.onCheck(checked, true)
            }
        }
    },
    mounted() {
        if (this.hasChilds) {
            this.childHeight = this.$refs.childs.scrollHeight
        }
    }
}
</script>
<style lang="less">
.tree-item {
    position: relative;
    overflow: hidden;
}
.tree-item-childs {
    margin-left: 10px;
    padding-left: 10px;
    border-left: 1px dotted #bbb;
    max-height: 0;
    opacity: 0;
    transition: opacity .3s ease-in-out, max-height .3s ease-in-out;
    &.show {
        max-height: none;
        opacity: 1;
    }
}
.tree-item-content {
    position: relative;
    z-index: 2;
    padding: 0 8px;
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    &:hover {
        background: rgba(0, 0, 0, .06)
    }
}
.tree-item-arrow {
    display: inline-block;
    width: 0;
    height: 0;
    margin-right: 8px;
    vertical-align: middle;
    border: 6px solid transparent;
    border-left-color: #999;
    border-right-width: 0;
    transition: transform .3s ease-in-out;
    &:hover {
        border-left-color: #666;
    }
    &.active {
        transform: rotate(90deg)
    }
    &.placeholder {
        width: 7px;
        height: 36px;
        margin-left: 2px;
        vertical-align: top;
        border-left: 1px dotted #bbb;
        border-bottom: 1px dotted #bbb;
        transition: none;
        transform: translateY(-50%)
    }
}
.tree-item-checkbox {
    position: relative;
    display: inline-block;
    margin-right: 8px;
    vertical-align: middle;
    line-height: 1;
    cursor: pointer;
    input {
        position: absolute;
        left: -999px;
        opacity: 0;
        outline: none;
        margin: 0;
        &:checked {
            + .tree-item-check-icon {
                border-color: #2196f3;
                background: #2196f3;
                &:after {
                    opacity: 1;
                    transform: rotate(45deg) scale(1);
                }
            }
        }
    }
    &:hover {
        .tree-item-check-icon {
            border-color: #2196f3
        }
    }
}
.tree-item-check-icon {
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    background: #fff;
    border: 1px solid #d8d8d8;
    border-radius: 2px;
    &:after {
        content: '';
        position: absolute;
        top: 1px;
        left: 5px;
        width: 6px;
        height: 10px;
        border: 3px solid #fff;
        border-left: 0;
        border-top: 0;
        opacity: 0;
        transition: transform .3s ease-in-out;
        transform: rotate(45deg) scale(0);
    }
}
.tree-item-text {
    display: inline-block;
    vertical-align: middle;
}
</style>
