import { isPlainObject } from './util'

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
 *
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
