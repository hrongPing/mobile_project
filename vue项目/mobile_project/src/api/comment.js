import request from '@/utils/request'
export const getCommentList = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
export const likeComment = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

export const delLikeComment = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}

export const publishComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
