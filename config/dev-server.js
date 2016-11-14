var express = require('express')
var webpack = require('webpack')
var opn = require('opn')
var config = require('./webpack.dev.conf')
var proxyMiddleware = require('http-proxy-middleware')

var app = express()
var compiler = webpack(config)
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {
        colors: true,
        chunks: false
    }
})
var hotMiddleware = require('webpack-hot-middleware')(compiler)

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
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

module.exports = app.listen(3000, function(err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:3000'
    console.log('Listening at ' + uri + '\n')
    opn(uri)
})