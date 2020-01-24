// 避免每次都去原型链上找
const toString = Object.prototype.toString

export function isObject(val: any): boolean {
  return val !== null && !Array.isArray(val) && typeof val === 'object'
}

// 对于 FormData、ArrayBuffer 这些类型，isObject 判断也为 true，但是这些类型的数据是不需要做处理的,
// 所以增加了isPlainObject，判断是否满足是普通对象的条件
export function isPlainObject(val: any): boolean {
  return toString.call(val) === '[object Object]'
}

// 谓词val is Date，使外部val可以直接使用toISOString方法
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
