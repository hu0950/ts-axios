import { deepMerge, isPlainObject } from './util'
import { Method } from '../types'

/**
 * 规范化headers的属性
 * @param headers
 * @param {string} normalizedName
 */
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (
      name !== normalizedName &&
      name.toUpperCase() === normalizedName.toUpperCase()
    ) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * 若没有设置Content-Type，且data是json类型，则自动设置'application/json;charset=utf-8'
 * @param headers
 * @param data
 * @returns {any}
 */
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

/**
 * 将响应的header string转化为obj
 * @param {string} headers
 * @returns {any}
 */
export function parseHeaders(headers: string): any {
  // 创建空对象
  let parsedObj = Object.create(null)

  if (!headers) {
    return parsedObj
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLocaleLowerCase()
    if (!key) return
    if (val) {
      val = val.trim()
    }
    parsedObj[key] = val
  })
  return parsedObj
}

/**
 *
 * @param headers
 * @param {Method} method
 * @returns {any}
 */
export function flattenHeaders(headers: any, method: Method): any {
  // TODO: ??
  if (!headers) {
    return headers
  }

  // 合并headers
  // headers[method]会根据不同的method，取出method方法对应的header
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodToDelete = [
    'delete',
    'get',
    'head',
    'options',
    'post',
    'put',
    'patch',
    'common'
  ]

  methodToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
