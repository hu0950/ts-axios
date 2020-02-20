import { AxiosRequestConfig } from './types'
import { transformRequest, transformResponse } from './helper/data'
import { processHeaders } from './helper/header'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  // 先处理headers、再转换data，是因为处理headers时，需要知道data原本的类型
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(data, headers)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}

// 无data的请求，只初始化header为空对象，不设置其它属性
const methodNoData = ['delete', 'get', 'head', 'options']
methodNoData.forEach(method => {
  defaults.headers[method] = {}
})

// 有data的请求，初始化各方法的header，并设置Content-Type为json类型
const methodWithData = ['post', 'put', 'patch']
methodWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
