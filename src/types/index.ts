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

export interface AxiosResponse {
  data: any
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
export interface AxiosPromise extends Promise<AxiosResponse> {}
