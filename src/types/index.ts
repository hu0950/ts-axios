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
  responseType?: XMLHttpRequestResponseType // 用于指定响应的数据类型
  timeout?: number
  // 预处理请求data - put、post 和 patch方法可用
  transformRequest?: AxiosTransformFn | AxiosTransformFn[]
  // 预处理返回data - put、post 和 patch方法可用
  transformResponse?: AxiosTransformFn | AxiosTransformFn[]
  cancelToken?: CancelToken
  // 合并参数时，会通过config2[key] 这种索引的方式访问，因此，需添加一个字符串索引签名
  [propName: string]: any
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
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  defaults: AxiosRequestConfig
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

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
}

export interface AxiosInterceptorManager<T> {
  // 返回number标识已创建的拦截器
  // resolved的类型是一个泛型函数
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}

// ResolvedFn泛型函数可传入T类型的val，支持返回T类型的值（同步），或promise（异步）-> promise的参数也是T类型的
export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransformFn {
  (data: any, headers?: any): any
}

// CancelToken类的实例类型
export interface CancelToken {
  promise: Promise<string>
  reason?: string
}

// 取消方法
export interface Canceler {
  (message?: string): void
}

// CancelToken类构造函数参数的定义，该参数支持传入一个类型为Canceler的函数
export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

// CancelToken类的类类型
export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}
