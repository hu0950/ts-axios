import { Canceler, CancelExecutor, CancelTokenSource } from '../types'

interface ResolvedPromise {
  (reason?: string): void
}
export default class CancelToken {
  promise: Promise<string>
  reason?: string

  constructor(executor: CancelExecutor) {
    let resolvedPromise: ResolvedPromise
    // 定义一个处于pedding状态的promise
    this.promise = new Promise<string>(resolve => {
      // 将 resolvedPromise 指向 resolve
      resolvedPromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = message
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
