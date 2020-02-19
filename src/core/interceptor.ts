import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}
export default class InterceptorManager<T> {
  // interceptors-拦截器集合（联合类型）
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  // 添加
  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  // 删除
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  // 内部逻辑，不暴露给外边
  // interceptors是私有变量，外部无法访问，为了可访问这个对象，需要添加这个方法
  /**
   * forEach 会遍历所有的拦截器interceptors，并支持传入函数，在遍历过程中，会调用该函数，并将每个拦截器对象作为该函数的参数传入
   * @param {(interceptor: Interceptor<T>) => void} fn
   */
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    console.log('forEach', this.interceptors)
    this.interceptors.forEach(item => {
      if (item !== null) {
        fn(item)
      }
    })
  }
}
