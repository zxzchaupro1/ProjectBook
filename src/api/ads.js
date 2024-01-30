import instance from './instance'

export const getAdsRandomApi = () => {
  return instance.get('/api/getads')
}
