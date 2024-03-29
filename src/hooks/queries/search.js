import { useQuery } from 'react-query'
import { search } from '../../api/book'

const searchbook = async (name) => {
  const res = await search(name)
  return res?.data?.data ?? []
}

export function useSearchBook(name) {
  return useQuery(['search-book', name], () => searchbook(name))
}
