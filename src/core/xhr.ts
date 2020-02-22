import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helper/header'
import { createError } from '../helper/error'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url = '',
      method = 'get',
      headers = {},
      responseType,
      timeout
    } = config

    // TODO: 对于new XMLHttpRequest()，做了什么？
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      // 设置请求超时的上限
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url, true)

    // 当readyState变化时，就会触发该函数
    request.onreadystatechange = function() {
      if (request.readyState !== 4) {
        return
      }

      // status表示http请求的状态，初始值为0
      if (request.status === 0) {
        return
      }

      // getAllResponseHeaders方法获取到含\r\n的一段字符串 -> JSON格式
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text'
          ? request.response
          : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    // 网络错误
    request.onerror = function() {
      // reject(new Error('NetWork error'))
      reject(createError('NetWork error', config, null, request))
    }

    // 超时错误处理：ontimeout在ajax请求超时时触发
    request.ontimeout = function() {
      // reject(new Error(`Timeout of ${timeout} ms exceeded`))
      reject(
        createError(
          `Timeout of ${timeout} ms exceeded`,
          config,
          'ECONNABORTED',
          request
        )
      )
    }
    console.log('data, config', config)
    console.log('data11111', data)
    // 请求的headers
    headers &&
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })

    request.send(data)

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        // reject(new Error(`Request failed with status code ${response.status}`))
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}

export default xhr
