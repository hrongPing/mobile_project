import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (e) {
      return data
    }
  }]
})
request.interceptors.request.use((config) => {
  if (store.state.user && store.state.user.token) { config.headers.Authorization = `Bearer ${store.state.user.token}` }

  return config
})
export default request
