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
}
