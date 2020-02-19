import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helper/util'

// 用于存储每种key对应取的取值策略函数，如：{'url': 'fromValConfig2Strat'}
let strats = Object.create(null)

// 三种取值策略：
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== undefined ? val2 : val1
}

function fromValConfig2Strat(val1: any, val2: any): any {
  if (typeof val2 !== undefined) {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    // 如果val2不是一个对象，且有值，则直接取val2
    return val2
  } else if (isPlainObject(val1)) {
    // 如果val2没有值，则判断val1
    return deepMerge(val1)
  } else {
    return val1
  }
}

// 预先处理，如果key在stratKeysFromVal2中，该key调用的是fromValConfig2Strat方法
const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  strats[key] = fromValConfig2Strat
})

const stratKeysDeepMerge = ['header']
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

/**
 * 合并config
 * @param {AxiosRequestConfig} config1 默认配置值
 * @param {AxiosRequestConfig} config2 用户传参
 * @returns {AxiosRequestConfig}
 */
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  // 先对可能不存在的值进行判断，以免以下循环时没有config2
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  /**
   * 对传入的key，合并在config1和config2的结果，并赋值给最后的config
   * @param {string} key
   */
  function mergeField(key: string): void {
    strats = strats[key] || defaultStrat
    // 确定执行到这时，config2不会为undefined, 因此，用断言的方式
    config[key] = strats(config1[key], config2![key])
  }
  return config
}
