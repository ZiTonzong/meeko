'use strict'
// 日期原型扩展
/**
 * @namespace Date_prototype
 */

const getYearWeek = function (dateObj) {
  let [a, b, c] = [
    dateObj.getFullYear(),
    dateObj.getMonth() + 1,
    dateObj.getDate()
  ]

  /*
    d1是当前日期
    d2是当年第一天
    d是当前日期是今年第多少天
    用d + 当前年的第一天的周差距的和在除以7就是本年第几周
    */

  let d1 = new Date(a, parseInt(b) - 1, c)
  let d2 = new Date(a, 0, 1)
  let d = Math.round((d1.valueOf() - d2.valueOf()) / 86400000)
  return Math.ceil((d + (d2.getDay() + 1 - 1)) / 7)
}

const format = function (s = 'yyyy-MM-dd hh:mm:ss') {
  /**
   * @function [format&date2Str]
   * @description 格式化日期
   * @memberof Date_prototype#
   * @param {string} s - 日期模板 yyyy/YYYY mm/MM ww/WW dd/DD hh/HH mm ss SS(毫秒) q(季度) X(unix秒).
   * @return {string} 返回 日期模板的结果.
   * @example
   * $.now().format('yyyy-MM-dd hh:mm:ss')
   * // 2019-6-1 10:19:01
   */

  const o = {
    'M+': this.getMonth() + 1, // 月份
    'w+': getYearWeek(this), // 周
    'W+': getYearWeek(this), // 周
    'd+': this.getDate(), // 日
    'D+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
    X: +this / 1000 | 0 // unix秒
  }
  if (/([yY]+)/.test(s)) {
    s = s.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(s)) {
      s = s.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return s
}

const dateOffset = function (interval, number) {
  /**
   * @function [dateAdd&offset]
   * @description 日期偏移操作.
   * @memberof Date_prototype#
   * @param {string} interval - 年月日时分秒周季 yMdhnswq.
   * @param {int} number - 时间间隔 可正负.
   * @return {string} 返回 得到日期年月日等加数字后的日期.
   * @example
   * $.now().offset('y',-1)
   * // 2018-6-1 10:19:01
   */

  const me = this
  const k = {
    y: 'FullYear',
    q: 'Month',
    M: 'Month',
    w: 'Date',
    d: 'Date',
    h: 'Hours',
    m: 'Minutes',
    s: 'Seconds',
    ms: 'MilliSeconds'
  }
  const n = {
    q: 3,
    w: 7
  }
  me['set' + k[interval]](
    me['get' + k[interval]]() + (n[interval] || 1) * number
  )
  return me
}
const isLeap = d => new Date(d.getFullYear(), 1, 29).getDate() === 29

module.exports = {
  isLeap () {
    return isLeap(this)
  },
  format (s) {
    return format.call(this, s)
  },
  getWeek () {
    return getYearWeek(this)
  },
  date2Str () {
    return format.call(this)
  },
  date8 (s = '') {
    /**
     * @memberof Date_prototype#
     * @function date8
     * @description 日期格式化8位函数.
     * @param {string} s - 分隔符.
     * @return {string} 返回 格式化结果.
     * @example
     * $.now().date8()
     * // 20190601
     */

    let m = this.getMonth() + 1
    let d = this.getDate()
    m = m <= 9 ? '0' + m : m
    d = d <= 9 ? '0' + d : d
    s = s || ''
    return [this.getFullYear(), m, d].join(s)
  },
  dateAdd (i, n) {
    return dateOffset.call(this, i, n)
  },
  offset (i, n) {
    return dateOffset.call(this, i, n)
  }
}
