import { isObject, isDate } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
export function buildURL(url: string, params?: any): string {
  // 如果参数未传，直接返回url
  if (!params) return url

  let parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]

    if (val === null || val === undefined) return

    let values: string[] = [] // 用数组统一管理
    if (Array.isArray(val)) {
      values = val // 此时values是数组
      key += '[]'
    } else {
      values = [val] // 除了数组类型，都存储到该数组中
    }
    values.forEach(val => {
      if (isObject(val)) {
        val = JSON.stringify(val)
      } else if (isDate(val)) {
        val = val.toISOString()
      }
      // 除了以上两种类型，都可以直接进行encode
      parts.push(`${encode(key)}=${encode(val)}`)
    })

    // 参数序列化
    let serializedParams = parts.join('&')
    if (serializedParams) {
      // 去除hash值
      const markIndex = url.indexOf('#')
      url = url.includes('#') ? url.slice(0, markIndex) : url
    }

    // 保留原有的query，在原有的url后拼接参数
    url += (url.includes('?') ? '&' : '?') + serializedParams
  })
  return url
}
