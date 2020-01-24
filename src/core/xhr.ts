import { AxiosRequestConfig } from '../types'

function xhr(config: AxiosRequestConfig): void {
  const { data = null, url = '', method = 'get', headers = {} } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  headers &&
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

  request.send(data)
}

export default xhr
