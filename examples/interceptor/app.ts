import axios from '../../src/index'

axios.interceptors.request.use(config => {
  config.headers.test += '1'
  // 在处理完config之后，需要返回config，否则接下来的拦截器链式调用将会失效
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let interceptor = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})
axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptor)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
})