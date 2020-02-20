import { AxiosTransformFn } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformFn | AxiosTransformFn[]
) {
  // 处理函数未传，不需要处理
  if (!fns) {
    return data
  }
  // fns 有可能只是传入一个对象，此处，统一处理成数组，便于以下做循环处理
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  // 实现管道式调用：将每次fn处理完return的data，再次赋值给传参data，使之保证下一个函数传入的data，是上一个函数处理后的data
  fns.forEach(fn => {
    data = fn(data, headers)
  })
}
