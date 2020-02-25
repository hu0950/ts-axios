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
