import request from '@/utils/request.js'

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
export const updateUserName = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}
export const updataUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
