# vue-scaffold

## 介绍

基于 Webpack 的 Vue SPA 开发环境，支持 ES6、Less、ESlint，种子项目已集成 vuex、vue-router、vue-resources、mockjs。

## 使用

```bash
# 获取脚手架到 vue-project 目录或自定义目录
$ git clone git@github.com:HYFE/vue-scaffold.git vue-project

# 进入工作目录或你的自定义目录
$ cd vue-project

# 安装依赖
$ npm install

# 启动开发服务
$ npm run dev

# 打包
$ npm run build
```

## 目录结构

```bash
├── config/                     # 环境配置文件
│   ├── build.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── mock.conf.js            # mock 配置
│   ├── mock.routes.js          # mock 路由
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   ├── webpack.prod.conf.js
├── src/
│   ├── main.js                 # 项目入口文件
│   ├── router.js               # 路由配置
│   ├── App.vue                 # main app component
│   ├── index.html              # index.html
│   ├── components/             # UI 组件
│   │   └── ...
│   ├── less/                   # less
│   │   └── ...
│   ├── view/                   # 视图组件
│   │   └── ...
│   ├── store/                  # vuex
│   │   ├── index.js            # 组合 vuex 模块
│   │   ├── actions.js          # 根 actions
│   │   ├── mutations.js        # 根 mutations
│   │   ├── modules/            # 根据业务逻辑划分子模块
│   │   │   └── ...
│   ├── api/
│   │   └── index.js            # 最终请求后端的地方
├── .editorconfig               # 编辑器配置
├── .eslintignore               # eslint ignore conf
├── .eslintrc.js                # eslint conf
└── package.json                # build scripts and dependencies
```

## 数据流

![Vue-dev-data-flow](https://camo.githubusercontent.com/54f50d197278348424eb0a3a2778a77f6b7c45b8/68747470733a2f2f7777772e70726f636573736f6e2e636f6d2f63686172745f696d6167652f3538323963353562653462303063346663386134636438302e706e67)

## 工作流

### 1.Mock data

编辑 `config/mock.conf.js`，定义API接口及数据格式。

```js
{
    // url
    url: '/city',
    // Mock template
    data: {
        "citys|1-10": {
            "310000": "上海市",
            "320000": "江苏省",
            "330000": "浙江省",
            "340000": "安徽省"
        }
    }
}
```


option | desc
---|---
`url` | api 接口，可定义模糊匹配形式
`method` | 省略该参数时为 `get` 协议，其他协议需显式设置，小写格式
`data` | 支持 `object` 或 `function` 形式，当为 `function` 形式时，可使用 `request` 参数，参考：[Express: request](http://www.expressjs.com.cn/4x/api.html#req)

### 2.请求数据

编辑 `src/api/index.js`，定义请求数据接口的函数。

```js
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default {
    getCitys() {
        return Vue.http.get('/city')
            .then(res => res.json(),
                res => console.error('error: ', res.status, res.statusText))
    }
}
```

### 3.声明数据

编辑 `src/store/index.js`，在 `state` 中添加新数据声明。

```js
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        citys: {}
    },
    mutations,
    actions
})
```

### 4.状态变更

编辑 `src/store/mutations.js`，这里是唯一可以改变应用状态的地方。

```js
export default {
    // data 为 actions 中提交的数据
    citys(state, data) {
        // 同步数据到 state
        state.citys = data
    }
}
```

### 5.提交数据

编辑 `src/store/actions.js`，调用 api 中的函数获取数据提交到 `mutations`。

```js
import API from '../api'

export default {
    getCitys(store) {
        API.getCitys().then(data => {
            // 提交数据
            store.commit('citys', data.citys)
        })
    }
}

```

### 6.编写组件

使用 `this.$store.dispatch('action')` 的形式触发 action，在计算属性 `computed` 中调用 `state` 中的数据。

```html
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
            return this.$store.state.citys
        }
    }
}
</script>
```

### 7.使用 Getters

在一些应用场景下，我们可能需要根据同一个数据来计算出一些推导数据，比如统计数目。

在 `src/store/index.js` 中定义 `getters`：

```js
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        citys: {}
    },
    mutations,
    actions,
    getters: {
        citysCount(state) {
            return Object.keys(state.citys).length
        }
    }
})
```

在组件 `computed` 中调用：

```js
computed: {
    citysCount() {
        return this.$store.getters.citysCount
    }
}
```

此时便可以在组件实例中使用该属性。


## 编码规范

### 1.命名

组件命名遵循 `Pascal` 规则，单词首字母大写。

```
App.vue
MainHeader.vue
```

```js
import MainHeader from 'components/MainHeader'
```

其余属性、函数等命名均使用 `CamelCase` 规则，除第一个单词全部小写，其余单词首字母大写。

```js
let postList = []
```

```js
methods: {
    onClick() {
        // ...
    }
}
```

### 2.组件

书写顺序：

```html
<template></template>
<script></script>
<style></style>
```

引用：

```js
import MyHeader from 'components/MyHeader'
import MyList from 'components/MyList'
import MyFooter from 'components/MyFooter'

export default {
    components: {
        MyHeader,
        MyList,
        MyFooter
    }
}
```

实例属性顺序书写建议：

```js
export default {
    // 常用属性
    mixins,
    extends,
    components,
    props,
    propsData,
    data,
    computed,
    watch,
    methods,
    // 生命周期
    beforeCreate,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    destroyed
}
```

### 3.模版

事件无额外参数时，不需要写括号，默认参数即为 `event`。

```html
<!-- bad -->
<a v-on:click="onClick()">click</a>

<!-- good -->
<a @click="onClick">click</a>
```

对可简写的指令使用简写。

```html
<!-- bad -->
<div v-bind:class="className" v-bind:html="hello"></div>
<!-- good -->
<div :class="className" :html="hello"></div>

<!-- bad -->
<input v-on:change="onChange">
<!-- good -->
<input @change="onChange">
```

属性过多时，换行。

```html
<my-component v-if="show"
    :comp-id="id"
    :data-list="dataList"
    :map-options="mapOptions"
    @on-change="onChange"></my-component>
```

### 其他

* 推荐以 ES6 为开发语言，参考 [ES6入门](http://es6.ruanyifeng.com/) 以及 [ES6代码规范](https://github.com/yuche/javascript)
* 使用 [Less](http://www.bootcss.com/p/lesscss/) 编写样式

> 不需要立刻记住所有，但是你可以保留这些页面以便后期参考。
