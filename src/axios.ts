import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
import xhr from './core/xhr'
import { buildURL } from './helper/url'
import { transformRequest, transformResponse } from './helper/data'
import { processHeaders } from './helper/header'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 先处理headers、再转换data，是因为处理headers时，需要知道data原本的类型
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  // TODO: 确保url不为空--> url!(断言方式)？？？有可能不存在？？？
  return buildURL(url!, params)
}

function transformRequestData(config: AxiosRequestConfig): string {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default axios