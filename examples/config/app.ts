import axios from '../../src/index'
import qs from 'qs'
import { AxiosTransformFn } from "../../src/types";

axios.defaults.headers.common['test2'] = 123

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res)
})
// ...(axios.defaults.transformRequest as AxiosTransformFn[]) 和 ...(axios.defaults.transformResponse as AxiosTransformFn[]) 是必须，
// 否则不会执行默认处理请求data和headers，以及相应data的逻辑。
axios({
  transformRequest: [(
    function(data) {
      return qs.stringify(data)+2
    }), ...(axios.defaults.transformRequest as AxiosTransformFn[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformFn[]),
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 111111
  }
}).then((res) => {
  console.log(res.data)
})

// const instance = axios.create({
//   transformRequest: [(function(data) {
//     return qs.stringify(data)
//   }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
//   transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   }]
// })
//
// instance({
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then((res) => {
//   console.log(res.data)
// })
