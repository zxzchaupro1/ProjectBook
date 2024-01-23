import { useQuery } from 'react-query'
import { getAllBanner } from '../../api/banner'

const getBanners = async () => {
  const res = await getAllBanner()
  return res?.data?.data ?? []
}

export function useQueryBanners() {
  return useQuery(['banners'], () => getBanners())
}
