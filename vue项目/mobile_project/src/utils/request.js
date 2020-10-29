import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
request.interceptors.request.use((config) => {
  if (store.state.user && store.state.user.token) { config.headers.Authorization = `Bearer ${store.state.user.token}` }
  return config
})
export default request
