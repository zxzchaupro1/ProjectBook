import instance from './instance'

export const getAllBooks = () => {
  return instance.get('/api/getbooks')
}

export const getBookByCategory = (id) => {
  return instance.get(`/api/getbooks/genre/${id}`)
}

export const search = (name) => {
  return instance.get(`/api/search`, {
    name,
  })
}

export const addPointApi = (userId, bookId) => {
  return instance.post('/api/addpoint', {
    userId,
    bookId,
  })
}
