import { AxiosRequestConfig } from './types'
import xhr from './core/xhr'
import { buildURL } from './helper/url'
import { transformRequest } from './helper/data'
import { processHeaders } from './helper/header'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 先处理headers、再转换data，是因为处理headers时，需要知道data原本的类型
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url = '', params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): string {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
