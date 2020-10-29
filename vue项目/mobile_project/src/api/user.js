import request from '@/utils/request.js'
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
export const sendSms = code => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${code}`
  })
}
export const loadUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
export const getchannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
