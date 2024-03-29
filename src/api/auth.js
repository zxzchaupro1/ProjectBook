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

export const getInfoUser = (userId) => {
  return instance.post(`/api/profile-user`, {
    userId,
  })
}

export const minuspointApi = (userId, minusPoint) => {
  return instance.post(`/api/minuspoint`, {
    userId,
    minusPoint,
  })
}
