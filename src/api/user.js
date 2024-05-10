import request from '@/utils/request'

//  注册接口
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

//  登录接口
export const userLoginService = ({ username, password, repassword }) =>
  request.post('/api/login', { username, password, repassword })

// 获取用户的基本信息
export const userGetInfoService = () => request.get('/my/userinfo')

// 更新用户基本资料
export const userUpdateInfoService = (data) => request.put('/my/userinfo', data)
