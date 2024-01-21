import instance from './instance'

export const loginApi = (data) => {
  return instance.post('api/login', data)
}

export const registerApi = (data) => {
  return instance.post('/api/signupNoOtp', data)
}
export const updateProfileApi = (userId, data) => {
  return instance.post(`/api/editUser/${userId}`, data)
}
export const changePWApi = (userId, data) => {
  return instance.post(`/api/changePassword/${userId}`, data)
}
