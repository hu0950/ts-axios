import { Canceler, CancelExecutor, CancelTokenSource } from '../types'
import Cancel from './Cancel'

interface ResolvedPromise {
  (reason?: Cancel): void
}
export default class CancelToken {
  promise: Promise<Cancel>
  // reason 是 Cancel 类的实例
  reason?: Cancel

  // 判断如果存在 this.reason，说明请求携带的 cancelToken 已经被使用过，直接抛错。
  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }

  constructor(executor: CancelExecutor) {
    let resolvedPromise: ResolvedPromise
    // 定义一个处于pedding状态的promise
    this.promise = new Promise<Cancel>(resolve => {
      // 将 resolvedPromise 指向 resolve
      resolvedPromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      // 将Cancel的实例化对象对象赋值给this.reason，用户在请求catch中，可通过访问reason.message，获取到在外部通过调用executor，传入的错误信息
      // 个人理解：this.reason 之所以是一个Cancel的实例化，而不只是一个简单的错误信息字符串，是为了在外层的请求catch中，可以区分出，这个e是普通错误的error，还是请求取消的error
      this.reason = new Cancel(message)
      // 执行resolvedPromise，相当于执行resolve(), 将promise从pedding状态置成resolve状态
      resolvedPromise(this.reason)
    })
  }

  // 可以理解为工厂函数
  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      // 将cancel指向constructor中定义的executor，外部调用cancel，即调用executor
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
