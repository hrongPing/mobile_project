import request from '@/utils/request'
export const allChannelList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
export const addUserChannel = channels => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}

export const deleteUserChannel = channelsiD => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelsiD}`
  })
}
