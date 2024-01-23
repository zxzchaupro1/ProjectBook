import { useQuery } from 'react-query'
import { getAdsRandomApi } from '../../api/ads'

const getAdsRandom = async () => {
  const res = await getAdsRandomApi()
  return res?.data?.data
}

export function useQueryAdsRandom() {
  return useQuery(['ads-random'], () => getAdsRandom())
}
