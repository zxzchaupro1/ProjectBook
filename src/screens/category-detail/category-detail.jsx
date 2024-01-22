import { memo, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { tw } from '../../components'
import { GridBook } from '../../components/grid-book'
import { useQueryBookByCategory } from '../../hooks'
import { Screen } from 'react-native-screens'

export const CategoryDetail = memo(({ route }) => {
  const navigation = useNavigation()
  const { data = [], isFetching, error, status } = useQueryBookByCategory(route?.params.item.genreId)

  useEffect(() => {
    if (route?.params.item.genreName) {
      navigation.setOptions({ title: route?.params.item.genreName })
    }
  }, [route])
  return (
    <Screen style={tw`bg-white flex-1`}>
      <GridBook status={status} data={data} error={error} isFetching={isFetching} />
    </Screen>
  )
})
