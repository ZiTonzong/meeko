const $ = require('./index')
const fs = require('fs')
const crypto = require('crypto')

function logTitle (s = '', strNum = 32) {
  console.log(`\n${'='.repeat(strNum)}${s}${'='.repeat(strNum)}\n`)
}
logTitle('基础-判断属性存在')
const propExistObj = { name: 'sky' }
const propExist1 = () => 'name' in propExistObj
const propExist2 = () => propExistObj.name !== undefined
const propExist3 = () => propExistObj.hasOwnProperty('name')
$.benchmark(propExist1, 'key in 方式', 1e6)
$.benchmark(propExist2, '直接判断undefined', 1e6)
$.benchmark(propExist3, 'hasOwnProperty判断', 1e6)

logTitle('基础-字符串存在判断')
const strOri =
  '9999nas56765d.n.kasdkskdnfkjsdfkjhsdfiuhsdfiusadfiuhsdfiöhsdifhsäodfskyjiosdfisdfsdfnosdfiosdf89sdfs98pdfzp98sdf98psfzp8sfzp8sfzp89szfp8snasd.n.kasdkskdskynfkjsdfkjhsdfiuhsdfiusadfiuhsdfiöhsdifhsäodfjiosdfisdfsdfnosdfiosdf89sdfs98pdfzp98sdf98psfzp8sfzp8sfzp89szfp8snasd.n.kasdkskdnfkjsdfkjhsdfiuhsdfiusadfiuhsdfiöhsdifhsäodfjiosdfisdfsdfnosdfiosdf89sdfs98pdfzp98sdf98psfzp8sfzp8sfzp89szfp8snasd.hellon.kasdkskdnfkjsdfkjhsdfiuhsdfiusadfiuhsdfiöhsdifhsäodfjiosdfisdfsdfnosdfiosdf89sdfs98pdfzp98sdf98psfzp8sfzp8sfzp89szfp8s'
const needle = 'sky'
const needleRegex = /sky/g
const strExist1 = () => strOri.indexOf(needle) > -1
const strExist2 = () => needleRegex.test(strOri)
const strExist3 = () => strOri.match(needleRegex)
const strExist4 = () => strOri.includes(needle)
const strExist5 = () => strOri.search(needleRegex)
$.benchmark(strExist1, 'indexOf查找')
$.benchmark(strExist2, '正则')
$.benchmark(strExist3, 'match判断')
$.benchmark(strExist4, 'es6 includes判断')
$.benchmark(strExist5, 'search判断')
logTitle('基础-克隆数组')
const cloneArray = [
  29,
  27,
  28,
  838,
  22,
  2882,
  2,
  93,
  84,
  74,
  7,
  933,
  3754,
  3874,
  22838,
  38464,
  3837,
  82424,
  2927,
  2625,
  63,
  27,
  28,
  838,
  22,
  2882,
  2,
  93,
  84,
  74,
  7,
  933,
  3754,
  3874,
  22838,
  38464,
  3837,
  82424,
  2927,
  2625,
  63,
  27,
  28,
  838,
  22,
  2882,
  2,
  93,
  84,
  74,
  7,
  933,
  3754,
  3874,
  22838,
  38464,
  3837,
  82424,
  2927,
  2625,
  63,
  27,
  28,
  838,
  22,
  2882,
  2,
  93,
  84,
  74,
  7,
  933,
  3754,
  3874,
  22838,
  38464,
  3837,
  82424,
  2927,
  2625,
  63
]
const cloneArr1 = () => cloneArray.slice()
const cloneArr2 = () => [].concat(cloneArray)
const cloneArr3 = () => {
  let a = []
  for (let i = cloneArray.length; i--;) {
    a.unshift(cloneArray[i])
  }
  return a
}
const cloneArr4 = () => {
  let a = []
  for (let i = 0, l = cloneArray.length; i < l; i++) {
    a.push(cloneArray[i])
  }
  return a
}
const cloneArr5 = () => {
  let l = cloneArray.length
  let a = new Array(l)
  for (let i = 0; i < l; i++) {
    a[i] = cloneArray[i]
  }
  return a
}
const cloneArr6 = () => Array.apply(undefined, cloneArray)
const cloneArr7 = () =>
  cloneArray.map(function (i) {
    return i
  })
const cloneArr8 = () => JSON.parse(JSON.stringify(cloneArray))
$.benchmark(cloneArr1, 'slice克隆', 1e5)
$.benchmark(cloneArr2, 'concat克隆', 1e5)
$.benchmark(cloneArr3, 'unshift克隆', 1e5)
$.benchmark(cloneArr4, 'push克隆', 1e5)
$.benchmark(cloneArr5, 'index克隆', 1e5)
$.benchmark(cloneArr6, '数组apply克隆', 1e5)
$.benchmark(cloneArr7, 'map克隆', 1e5)
$.benchmark(cloneArr8, 'JSON.stringify克隆', 1e5)

logTitle('基础-数组对象查找')
const findArr = [
  { id: 29938 },
  { id: 32994 },
  { id: 38428 },
  { id: 20395 },
  { id: 32949 }
]

const oFind = {}
oFind['29938'] = { id: 29938 }
oFind['32994'] = { id: 32994 }
oFind['38428'] = { id: 38428 }
oFind['20395'] = { id: 20395 }
oFind['32949'] = { id: 32949 }

const keyToFind = '38428'
const findId1 = () => {
  let result

  for (let i = 0; i < findArr.length; ++i) {
    if (findArr[i].id == keyToFind) {
      result = findArr[i].id
      break
    }
  }
  return result
}
const findId2 = () => findArr.find(item => item.id == keyToFind)
const findId3 = () => oFind[keyToFind]
$.benchmark(findId1, 'for循环查找', 1e6)
$.benchmark(findId2, 'find迭代函数查找', 1e6)
$.benchmark(findId3, 'hash直接查找', 1e6)

logTitle('基础-delete undefined null')
const delObj = {
  name: 'sky',
  lastName: 'kong'
}
const del1 = () => delete delObj.name
const del2 = () => delObj.name = undefined
const del3 = () => delObj.name = null
$.benchmark(del1, 'delete删', 1e6)
$.benchmark(del2, '赋值undefined', 1e6)
$.benchmark(del3, '赋值null', 1e6)

logTitle('基础-判断整数')

const isInt1 = () => {
  const value = 0.15
  return (
    !isNaN(value) &&
    (function (x) {
      return (x | 0) === x
    })(parseFloat(value))
  )
}

const isInt2 = () => $.tools.isInt(0.15)
$.benchmark(isInt1, '普通判断整数', 1e6)
$.benchmark(isInt2, '正则判断整数', 1e6)

logTitle('基础-数组最大最小值')
const minMaxArr = [
  82,
  28,
  2726,
  28,
  29,
  19,
  282737,
  88,
  2827,
  917,
  2,
  2828,
  999,
  827,
  82,
  928272,
  2826,
  373636,
  278,
  2282,
  292727,
  282,
  23,
  833,
  92829,
  282,
  2,
  939,
  111,
  8382,
  238
]
const minMax1 = () => [Math.min(...minMaxArr), Math.max(...minMaxArr)]
const minMax2 = () => [
  minMaxArr.reduce((a, b) => Math.min(a, b)),
  minMaxArr.reduce((a, b) => Math.max(a, b))
]
const minMax3 = () => [
  Math.min.apply(null, minMaxArr),
  Math.max.apply(null, minMaxArr)
]

$.benchmark(minMax1, 'es6 解构查找数组最值', 1e6)
$.benchmark(minMax2, 'reduce查找数组最值', 1e6)
$.benchmark(minMax3, '普通方式查找数组最值', 1e6)

logTitle('基础-字符串拼接')
const strConcat1 = () => {
  const t = 'x'
  let tt = ''
  for (let i = 0; i < 1000; i++) {
    tt += t
  }
  return tt
}
const strConcat2 = () => {
  const t = 'x'
  let tt = []
  for (let i = 0; i < 1000; i++) {
    tt.push(t)
  }
  return tt.join('')
}
const strConcat3 = () => {
  const t = 'x'
  let tt = []
  for (let i = 0; i < 1000; i++) {
    tt[tt.length] = t
  }
  return tt.join('')
}
$.benchmark(strConcat1, '直接+=', 1e4)
$.benchmark(strConcat2, 'join字符串', 1e4)
$.benchmark(strConcat3, 'length-join', 1e4)
logTitle('阶乘比较')
function factorialize1 (num) {
  if (num < 0) {
    return -1
  } else if (num === 0 || num === 1) {
    return 1
  } else {
    return num * factorialize1(num - 1)
  }
}
function fac1 () {
  const ret = factorialize1(100)
}
function fac2 () {
  const ret = $.math.fac(100)
}

$.benchmark(fac1, '递归阶乘', 100000)
$.benchmark(fac2, '不递归阶乘', 100000)

logTitle('四舍五入比较')
const round1 = () =>
  (function (n, dec) {
    return n.round(dec)
  })(1.23456789, 4)
const round2 = () =>
  (function (n, dec) {
    return Number(`${Math.round(`${n}e${dec}`)}e-${dec}`)
  })(1.23456789, 4)
$.benchmark(round1, 'sky四舍五入到某一位', 100000)
$.benchmark(round2, '网上技巧es6实现任意位四舍五入', 100000)

logTitle('去重函数比较')
const uniq1 = function () {
  function uniq (array) {
    const temp = {}
    const r = []
    const len = array.length
    let val
    let type
    for (let i = 0; i < len; i++) {
      val = array[i]
      type = typeof val
      if (!temp[val]) {
        temp[val] = [type]
        r.push(val)
      } else if (temp[val].indexOf(type) < 0) {
        temp[val].push(type)
        r.push(val)
      }
    }
    return r
  }
  return uniq([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN])
}
const uniq2 = function () {
  return [undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN].unique()
}

const uniq3 = function () {
  function uniq (array) {
    const n = [array[0]]
    let hasNaN = 0 // 结果数组
    for (let i = 1; i < array.length; i++) {
      if (array.indexOf(array[i]) === i) {
        n.push(array[i])
      }
      if (hasNaN === 0 && isNaN(array[i])) {
        hasNaN = 1
        n.push(NaN)
      }
    }
    return n
  }
  return uniq([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN])
}
$.benchmark(uniq1, '对象键值法去重法,es5时代号称最快', 100000)
$.benchmark(uniq2, 'es6方案', 100000)
$.benchmark(uniq3, '最简单数组去重法,但结果可能有误差', 100000)

logTitle('累加比较')
const sum1 = function () {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let s = 0
  for (let i = 0; i < a.length; i++) {
    s += a[i]
  }
  return s
}
const sum2 = function () {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  return $.math.sum(a)
}

$.benchmark(sum1, 'for循环累加', 1000000)
$.benchmark(sum2, 'reduce累加', 1000000)

logTitle('求max比较')
const max1 = function () {
  const arr = [7, 2, 0, -3, 5]
  return Math.max.apply(null, arr)
}
const max2 = function () {
  const arr = [7, 2, 0, -3, 5]
  return arr.sort(function (a, b) {
    return b - a
  })[0]
}
const max3 = function () {
  const arr = [7, 2, 0, -3, 5]
  return $.math.max(arr)
}
const max4 = function () {
  const arr = [7, 2, 0, -3, 5]
  return Math.max(...arr)
}
$.benchmark(max1, 'apply求max')
$.benchmark(max2, 'sort求max')
$.benchmark(max3, 'reduce求max')
$.benchmark(max4, 'es6解构求max')

logTitle('数组分组比较')
const chunk1 = function () {
  const a = [345, 45, 5, 58, 5, 325, 756, 86, 342, 62, 51, 56437, 34, 5]
  a.chunk(7)
}
const chunk2 = function () {
  function chunk (array, subGroupLength) {
    let idx = 0
    const newArray = []
    while (idx < array.length) {
      newArray.push(array.slice(idx, idx += subGroupLength))
    }
    return newArray
  }
  const a = [345, 45, 5, 58, 5, 325, 756, 86, 342, 62, 51, 56437, 34, 5]
  chunk(a, a.length / 7)
}
$.benchmark(chunk1, 'es6数组分组', 100000)
$.benchmark(chunk2, '普通数组分组', 100000)

logTitle('洗牌比较')

const shuffle1 = function () {
  const arr = [7, 2, 0, -3, 5]
  return arr.shuffle()
}
const shuffle2 = function () {
  return [7, 2, 0, -3, 5].fisherYates
}
$.benchmark(shuffle1, '普通洗牌算法')
$.benchmark(shuffle2, 'Fisher-Yates洗牌算法')

logTitle('唯一ID生成比较')
const tempSnowflake = new $.Snowflake(1, 1, 0)
const genSnowFlake = function () {
  return tempSnowflake.nextId()
}
const genUUID = function () {
  return $.tools.uuid()
}

const UUIDGen = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.randomBytes(1)[0] & 15 >> c / 4).toString(16)
  )
$.benchmark(genSnowFlake, 'sky SnowFlake函数', 100000)
$.benchmark(genUUID, 'sky gUID函数', 100000)
$.benchmark(UUIDGen, 'UUIDGen', 10000)

logTitle('随机整数生成比较')

function secRand (a, b) {
  // （1）首先找到样本数据Y的最小值Min及最大值Max
  // （2）计算系数为：k=(b-a)/(Max-Min)
  // （3）得到归一化到[a,b)区间的数据：norY=a+k(Y-Min)

  let r = crypto.randomBytes(4) // 0-4294967295
  return Math.floor((b - a + 1) / 4294967295 * r.readUInt32LE(0)) + a
}
const rand1 = function () {
  return $.math.uniformRandInt(0, 10000)
}
const rand2 = function () {
  return secRand(0, 10000)
}
$.benchmark(rand1, '普通包含两端随机函数', 100000)
$.benchmark(rand2, '安全包含两端随机函数randomBytes实现', 100000)
