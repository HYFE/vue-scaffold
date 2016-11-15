var Mock = require('mockjs')
var configs = require('./mock.conf')

module.exports = function(app) {

    configs.forEach(function(item) {
        app[item.method || 'get'](item.url, function (req, res) {
            var template = typeof item.data === 'function' ? item.data(req) : item.data
            res.send(Mock.mock(template))
        })
    })
}
