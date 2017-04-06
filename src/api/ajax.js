import axios from 'axios'
import { ROOT_PATH } from './config'

const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = FORM_CONTENT_TYPE
axios.defaults.headers.put['Content-Type'] = FORM_CONTENT_TYPE

const Ajax = axios.create({
    // 公共 HTTP 配置
    baseURL: ROOT_PATH,
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' },
    responseType: 'json'
})

/**
 * 格式化参数
 * @param {*} params Object
 */
const QS = (params = {}) => {
    let url = ''
    Object.keys(params).forEach((k, i) => {
        url += `${i === 0 ? '' : '&'}${k}=${params[k]}`
    })
    return url
}

const HTTP_HANDLE = req => req.then(res => res.data).catch(err => console.error('[API]:', err))

/**
 * http GET
 * @param {*} url String
 * @param {*} params Object
 */
export const GET = (url, params) => HTTP_HANDLE(Ajax.get(url, params ? {
    params
} : params))

/**
 * http POST
 * @param {*} url String
 * @param {*} body Object
 */
export const POST = (url, body) => HTTP_HANDLE(Ajax.post(url, QS(body)))

/**
 * http PUT
 * @param {*} url String
 * @param {*} body Object
 */
export const PUT = (url, body) => HTTP_HANDLE(Ajax.put(url, QS(body)))

/**
 * http DELETE
 * @param {*} url String
 * @param {*} params Object
 */
export const DELETE = (url, params) => HTTP_HANDLE(Ajax.delete(url, params ? {
    params
} : params))

const fixUrl = url => (url.lastIndexOf('/') === url.length ? url : `${url}/`)
const urlPattern = (url, arg) => ({
    url: url.replace(/:[a-zA-Z]+/g, m => arg.shift()),
    params: arg.length ? arg[0] : null
})

/**
 * 对常用 RESTful 请求格式的封装，支持多级资源请求
 * 以一个实体 User 为例，基础 URL 为 `/api/user`，则：
 * 查询 GET /api/user/:id
 * 添加 POST /api/user
 * 修改 PUT /api/user/:id
 * 删除 DELETE /api/user/:id
 *
 * @export
 * @class Api
 */
export default class Api {
    constructor(url) {
        this.url = fixUrl(url)
    }

    add(...args) {
        const { url, params } = urlPattern(this.url, args)
        return POST(url, params)
    }

    update(...args) {
        const { url, params } = urlPattern(`${this.url}:id`, args)
        return PUT(url, params)
    }

    delete(...args) {
        const { url, params } = urlPattern(`${this.url}:id`, args)
        return DELETE(url, params)
    }

    one(...args) {
        const { url, params } = urlPattern(`${this.url}:id`, args)
        return GET(url, params)
    }

    all(...args) {
        const { url, params } = urlPattern(this.url, args)
        return GET(url, params)
    }
}
