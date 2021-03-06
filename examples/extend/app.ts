import axios from '../../src/index'
import {AxiosResponse} from "../../src/types";

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })

// axios直接可接收两个参数（url，config）
axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'axios直接可接收两个参数（url，config）'
  }
})


// 定义响应数据data的数据结构
interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

// 定义响应数据data.result的数据结构
interface User {
  name: string
  age: number
  sex: string
}

function getUser<T>() {
  return axios<ResponseData<T>>("/extend/user")
    .then(res => res.data)
    .catch(err => console.error(err))
}


async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()
