import axios, { Canceler } from '../../src/index'

// 以下例子，先执行：
// Operation canceled by the user.
// Request canceled Operation canceled by the user.

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  // axios.isCancel(e) 会判断 在 ehr 中throw的error是不是Cancel的实例，如果是，则是取消请求，请求abort后抛出的异常，以此用来鉴别和普通的抛错
  // 此处的e是Cancel的实例化对象
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

// setTimeout(() => {
//   debugger
//   // source.cancel的参数是传给executor的参数
//   source.cancel('Operation canceled by the user.')
//   //
//   axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
//     if (axios.isCancel(e)) {
//       console.log(e.message)
//     }
//   })
// }, 100)

let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(() => {
  cancel()
}, 200)
