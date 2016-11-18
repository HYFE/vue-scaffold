# vue-scaffold

## 目录

* [介绍](#介绍)
* [使用](#使用)
* [目录结构](#目录结构)
* [数据流](#数据流)
* [工作流](#工作流)
    1. [Mock data](#1mock-data)
    2. [请求数据](#2请求数据)
    3. [声明数据](#3声明数据)
    4. [状态变更](#4状态变更)
    5. [提交数据](#5提交数据)
    6. [编写组件](#6编写组件)
    7. [使用 Getters](#7使用-getters)
* [测试](#测试)
    * [单元测试](#单元测试)
    * [端到端测试](#端到端测试)
        * [弊端](#弊端)
* [关于MockJS](#关于mockjs)
* [编码规范](#编码规范)
    1. [命名](#1命名)
    2. [组件](#2组件)
    3. [模版](#3模板)
    4. [其他](#其他)

## 介绍

基于 Webpack 的 Vue2 SPA 开发环境，支持 ES6、Less、ESlint、e2e test，种子项目已集成 vuex、vue-router、vue-resources、mockjs。

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

# e2e test
$ npm run e2e

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
├── test/
│   ├── e2e/                    # e2e test
│   │   ├── custom-assertions/  # 自定义断言
│   │   │   └── ...
│   │   ├── specs/              # 测试用例
│   │   │   └── ...
│   │   ├── nightwatch.conf.js  # nightwatch 配置
│   │   ├── runner.js           # e2e start
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

## 测试

目前在 Vue 的开发实践中一般有两种测试：单元测试（Unit）和端到端测试（E2E）。

### 单元测试

> 单元测试，是指对软件中的最小可测试单元进行检查和验证。

在 Vue 中，以一个组件为最小可测试单元，也就是最小的可测试功能模块。在测试运行时，将会把一个独立单元置入与程序其他部分相隔离的情况下测试。

一个简单的 Vue 单元测试用例：

```js
import Vue from 'vue'
import Hello from 'src/components/Hello'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Hello)
    })
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
```

在单元测试环境中，被测试组件将与其他 Vue 组件和模块（如：vuex、vueRouter等）隔离。这意味着如果一个组件依赖其他组件或模块，会难以达到单元测试的条件。

**期望：**

> 很多组件的渲染输出由它的props决定。事实上，如果一个组件的渲染输出完全取决于它的props，那么它会让测试变得简单，就好像断言不同参数的纯函数的返回值。        *--[编写可被测试的组件](https://vuefe.cn/guide/unit-testing.html#编写可被测试的组件)*

这样看来，符合 Vue 单元测试条件的一般是 UI 类组件。鉴于开发中会直接引入第三方 UI 组件库，单元测试可以暂且搁置。

### 端到端测试

![Vue-e2e-test-示例](https://segmentfault.com/img/remote/1460000006769113)

图片来自 [搭建自己的前端自动化测试脚手架](https://segmentfault.com/a/1190000005991670?share_user=1030000002791361)

只需要敲一条命名，就能启动浏览器窗口，按照你预定的动作对页面模拟操作，在整个测试周期结束后显示测试结果。这才是我们理想中的自动化测试啊！

这是目前集成的示例项目中的测试用例：

```js
module.exports = {
    'default e2e tests': function (browser) {
        // doc: http://nightwatchjs.org/api
        const devServer = browser.globals.devServerURL

        browser.url(devServer)
            .waitForElementVisible('#app', 10000)
            .waitForElementVisible('button', 2000)
            .click('button')
            .pause(3000)

        browser.expect.element('p').text.to.match(/共[ ]?[1-9][ ]?条数据/)
        browser.expect.element('ul li').to.be.visible
        browser.end()
    }
}
```

所做的工作有：

1. 启动浏览器，打开测试服务器网址
2. 等待 10s，直到 `#app` 为可见状态
3. 等待 2s，直到 `button` 为可见状态
4. 模拟点击 `button`
5. 暂停 3s
6. 期望 `p` 标签的内容匹配 `/共[ ]?[1-9][ ]?条数据/`
7. 期望 `ul li` 为可见状态
8. 结束会话，如果没有下一个测试用例就结束测试

如此便可一劳永逸，而你需要做的就是写测试！[NightWatch API](http://nightwatchjs.org/api)

#### 弊端

有时候虽然 e2e 没有通过，并不代表程序是有问题的。

由于 Vue 应用节点多为组件动态构建或异步载入，在测试运行时可能不能正确获取到状态的变更，所以测试中会加入许多延迟、暂停类的等待语句。尽管如此也不能保证 100% 测试通过。

缩短网络请求时间也许是最简单的解决办法了，只需要服务器和运行测试都在本地进行，甚至一台机器的同一端口。

## 关于MockJS

在前端范围使用 MockJS 时，它会对 XHR 对象进行覆盖，匹配到对应 URL 后直接返回对应数据，不会真正发出请求。

比如这个例子，覆盖 `alert`，参数为对象时不弹出，而是在 `console` 输出：

```js
var _alert = alert
alert = function(e){
    if(typeof e === 'object') {
        console.log(e)
    } else {
        _alert(e)
    }
}
```

而在实际开发时，也许我们会需要有真实的 HTTP 请求存在。
于是我把 Mock 放到了 DevServer 去做。

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
