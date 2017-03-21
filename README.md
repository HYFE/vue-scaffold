# vue-scaffold

## 介绍

基于 Webpack 的 Vue2 SPA 开发环境，支持 ES6、Less、ESlint、e2e test，种子项目已集成 vuex、vue-router、axios、mockjs 等。

## 使用

```bash
# 获取脚手架到 vue-project 目录或自定义目录
$ git clone git@github.com:HYFE/vue-scaffold.git vue-project

# 进入工作目录或你的自定义目录
$ cd vue-project

# 安装依赖
$ npm install

# 全局安装 supervisor，监视开发服务器和 webpack 配置等代码更改
$ npm install supervisor -g

# 启动开发服务
$ npm run dev

# e2e test
$ npm run e2e

# 打包
$ npm run build
```

## 目录结构

```bash
├── build/                     # 环境配置文件
│   ├── build.js
│   ├── config.js              # 目录及端口等常用配置项
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── mock.routes.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   ├── webpack.prod.conf.js
├── mock/
│   └── ...                     # mock路由和数据配置
├── src/
│   ├── main.js                 # 项目入口文件
│   ├── router/               # 路由配置
│   │   └── ...
│   ├── App.vue                 # main app component
│   ├── index.html              # index.html
│   ├── components/             # 可复用组件
│   │   └── ...
│   ├── less/                   # less
│   │   └── ...
│   ├── view/                   # 视图组件
│   │   └── ...
│   ├── libs/                   # 第三方库文件
│   │   └── ...
│   ├── plugins/                # Vue插件
│   │   └── ...
│   ├── util/                   # 常用工具库
│   │   └── ...
│   ├── assets/                 # 静态资源文件
│   │   └── fonts
│   │   └── images
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
