import { useQuery } from 'react-query'
import { getAllBooks, getBookByCategory } from '../../api/book'

const getbooks = async () => {
  const res = await getAllBooks()
  console.log('res', res.data.data)
  return res.data.data ?? []
}

export function useQueryBooks() {
  return useQuery(['books'], () => getbooks())
}

const getbookbycate = async (id) => {
  if (!id) return
  const res = await getBookByCategory(id)
  return res.data
}

export function useQueryBookByCategory(id) {
  return useQuery(['books', id], () => getbookbycate(id))
}
