import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
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
