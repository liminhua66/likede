import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/api/user-service/user/login',
    method: 'POST',
    data
  })
}

export function logout() {

}

// 获取图片验证码
export function getImgCode(clientToken) {
  return request({
    url: `/api/user-service/user/imageCode/${clientToken}`
  })
}
