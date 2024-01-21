import instance from './instance'

export const loginApi = (data) => {
  return instance.post('api/login', data)
}

export const registerApi = (data) => {
  return instance.post('/api/signupNoOtp', data)
}
export const updateProfileApi = (id, data) => {
  return instance.patch(`users/${id}`, data)
}
