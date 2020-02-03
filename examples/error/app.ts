import axios, { AxiosError } from '../../src/index'

// demo: 模拟url错误
axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log('url not found', e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

// demo: 模拟网络错误->设置5s后再发请求，可以在浏览器控制台操作在5s内，将网络置成离线
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log(res)
  }).catch((e) => {
    console.log(e)
  })
}, 5000)

// demo: 超时->设置请求的超时时间是2s，但请求的返回，将于3s后返回
// demo: 错误信息增强
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
  // TypeScript 并不能把 e 参数推断为 AxiosError 类型, 需要手动指明
}).catch((e: AxiosError) => {
  console.log('demo', e)
  console.log(e.message)
  console.log(e.config)
  console.log(e.code)
  console.log(e.request)
  console.log(e.response)
  console.log(e.isAxiosError)
})
