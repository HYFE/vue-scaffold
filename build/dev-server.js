const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.dev.conf')
// const proxyMiddleware = require('http-proxy-middleware')
const reload = require('reload')
const http = require('http')

const app = express()
const compiler = webpack(config)
const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {
        colors: true,
        chunks: false
    }
})
const hotMiddleware = require('webpack-hot-middleware')(compiler)

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)
app.use(hotMiddleware)

// serve pure static assets
app.use('/src', express.static('./src'))

// mock router
require('./mock.routes')(app)

const server = http.createServer(app)
reload(server, app)

module.exports = server.listen(3000, err => {
    if (err) {
        console.log(err)
        return
    }
    const uri = 'http://localhost:3000'
    console.log(`Listening at ${uri}\n`)
})
