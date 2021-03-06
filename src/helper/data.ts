import { isPlainObject } from './util'

/**
 * 满足是一般的Json对象
 * @param data
 * @returns {any}
 */
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do anything
    }
  }
  return data
}
