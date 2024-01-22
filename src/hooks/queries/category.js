import { useQuery } from 'react-query'
import { getAllCategory } from '../../api/category'

const getCategories = async () => {
  try {
    const res = await getAllCategory()
    return res?.data?.data ?? []
  } catch (error) {
    return error
  }
}

export function useQueryCategories() {
  return useQuery(['categories'], () => getCategories())
}
