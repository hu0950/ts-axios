export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method // 为了只可传入符合要求的字符串，用type进行限定
  headers?: any
  params?: any // head、get 等类型请求的数据
  data?: any // post、patch 等类型请求的数据
  responseType?: XMLHttpRequestResponseType // 用于指定响应的数据类
  timeout?: number
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// 给axios方法调用时的外部接口使用，message 继承自 Error
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

// 这样的写法：当axios返回的是AxiosPromise类型，则resolve函数中的参数就是一个AxiosResponse类型
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  // 只有一个参数
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  // 两个参数
  // config-非必填参数，如果没有传，默认是get方式
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
