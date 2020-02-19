import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/axios'
import { extend } from './helper/util'
import defaults from './default'

// AxiosInstance是混合类型接口，我们希望在这个函数中，所创建的实例对象，
// 符合这个AxiosInstance接口的描述，既有函数，又有属性，既可以实现直接调用axios函数，又可以调用axios[method]方法
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  // TODO: 为什么不用类的实例直接调用方法：context.request，结论是希望instance上有request方法
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  // TypeScript 不能正确推断 instance 的类型，因此需手动断言成AxiosInstance类型
  return instance as AxiosInstance
}
const axios = createInstance(defaults)

export default axios
