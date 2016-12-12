import Vue from 'vue'

const TO_JSON = res => res.json()
const ERROR_HANDLE = res => console.error('ERROR: ', res.status, res.statusText)

const HTTP = (method, args) => Vue.http[method].apply(Vue.http, args).then(TO_JSON, ERROR_HANDLE)

export const GET = (...args) => HTTP('get', args)
export const POST = (...args) => HTTP('post', args)
export const PUT = (...args) => HTTP('put', args)
export const DELETE = (...args) => HTTP('delete', args)
