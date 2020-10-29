import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Vue from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.filter('dateformat', value => {
  return dayjs().to(dayjs(value))
})
// 传字符串,不是数字
// console.log(dayjs().to(dayjs('2019')))
