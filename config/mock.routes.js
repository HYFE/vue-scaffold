const Mock = require('mockjs')
const configs = require('./mock.conf')

module.exports = app => {

    configs.forEach(({url, method = 'get', data }) => {
        app[method](url, (req, res) => {
            const template = typeof data === 'function' ? data(req) : data
            res.send(Mock.mock(template))
        })
    })
}
