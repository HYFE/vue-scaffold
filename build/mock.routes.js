const Mock = require('mockjs')
const path = require('path')
const fs = require('fs')
const mockPath = path.resolve(__dirname, '../mock')
const apiRoot = require('./config').apiRoot

module.exports = app => {
    fs.readdirSync(mockPath).forEach(file => {
        const preUrl = apiRoot + path.basename(file, '.js')
        require(path.resolve(mockPath, file)).forEach(({url, method = 'get', data }) => {
            app[method](preUrl + url, (req, res) => {
                const template = typeof data === 'function' ? data(req) : data
                res.send(Mock.mock(template))
            })
        })
    })
}
