import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar111'
  },
})

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})

// post请求 - data为一般对象
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(11111, res)
})

axios({
    method: 'post',
    url: '/base/post',
    data: {
        a: 3,
        b: 4
    }
}).then(res => {
    console.log(2222, res)
})

// post请求 - data为一般formdata对象
axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  data: 'user=person&pwd=password&organization=place&requiredkey=key'
})

// post请求 - data为Int32Array类型
const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})
