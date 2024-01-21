import instance from './instance'

export const getAllBooks = () => {
  return instance.get('/api/getbooks')
}

export const getBookByCategory = (id) => {
  return instance.get(`book?categoryId=${id}`)
}

export const search = (name) => {
  return instance.get(`search`, {
    name,
  })
}
