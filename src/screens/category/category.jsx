import { memo } from 'react'
import { useQueryCategories } from '../../hooks'
import { tw } from '../../components'
import { GridBook } from '../../components/grid-book'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TouchableHighlightBase, View } from 'react-native'
import { Text } from '@rneui/base'
import { Button } from '@rneui/themed'
import { AppRouter } from '../../constants'
import { useNavigation } from '@react-navigation/native'

export const Category = memo(() => {
  const navigation = useNavigation()

  const { data, isFetching, isLoading, error, status, isError } = useQueryCategories()

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <ScrollView nestedScrollEnabled={true} style={{ width: '100%' }}>
        {isLoading || isFetching ? (
          <View style={tw`flex justify-center items-center`}>
            <Text>Đang tải...</Text>
          </View>
        ) : null}
        {isError ? <Text>{error.message}</Text> : null}
        {(data ?? []).map((item, idx) => (
          <View key={idx}>
            <View style={tw`flex flex-row justify-between items-center px-12px`}>
              <Text style={tw`font-bold text-18px`}>{item?.genreName}</Text>
              <Button
                title="Tất cả"
                titleStyle={tw`text-[14px]`}
                type="clear"
                onPress={() => {
                  navigation.navigate(AppRouter.categoryDetail, {
                    item: {
                      genreId: item.genreId,
                      genreName: item.genreName,
                    },
                  })
                }}
              />
            </View>
            <GridBook
              status={status}
              data={item?.books && item?.books.length > 0 ? item?.books.slice(0, 2) : []}
              error={error}
              isFetching={isFetching}
              scrollEnabled={false}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
})
