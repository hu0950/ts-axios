import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    // 实例化AxiosError对象可以调用message
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // TODO： ？？在call super之后，手动指定AxiosError类的原型，这段代码是为了解决 TypeScript 继承一些内置对象的时候的坑
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

/**
 * 为了方便在外部实例化类，这里创建一个工厂函数，接收实例化AxiosError所需参数
 * @param {string} message
 * @param {AxiosRequestConfig} config
 * @param {string | null} code
 * @param request
 * @param {AxiosResponse} response
 * @returns {AxiosError}
 */
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  return new AxiosError(message, config, code, request, response)
}
