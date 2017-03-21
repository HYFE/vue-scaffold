import axios from 'axios'

const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = FORM_CONTENT_TYPE
axios.defaults.headers.put['Content-Type'] = FORM_CONTENT_TYPE

const Ajax = axios.create({
    // 公共 HTTP 配置
    baseURL: '/api',
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' },
    responseType: 'json'
})

const QS = (params = {}) => {
    let url = ''
    Object.keys(params).forEach((k, i) => {
        url = url + `${i === 0 ? '' : '&'}${k}=${params[k]}`
    })
    return url
}

const HTTP_HANDLE = req => req.then(res => res.data).catch(err => console.error('[API]:', err))

// 工具函数
export const GET = (url, params) => HTTP_HANDLE(Ajax.get(url, params ? {
    params
} : params))
export const POST = (url, body) => HTTP_HANDLE(Ajax.post(url, QS(body)))
export const PUT = (url, body) => HTTP_HANDLE(Ajax.put(url, QS(body)))
export const DELETE = (url, params) => HTTP_HANDLE(Ajax.delete(url, params ? {
    params
} : params))

/**
 * 对常用 Rest 请求格式的封装
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
        this.url = this.fixUrl(url)
    }

    fixUrl(url) {
        return url.lastIndexOf('/') === url.length ? url : url + '/'
    }

    add(m) {
        return POST(this.url, m)
    }

    update(id, m) {
        return PUT(this.url + id, m)
    }

    delete(id, params) {
        return DELETE(this.url + id, params ? {
            params
        } : params)
    }

    one(id, params) {
        return GET(this.url + id, params)
    }

    all(params) {
        return GET(this.url, params)
    }
}
