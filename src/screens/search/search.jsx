import { useState, memo, useCallback } from 'react'
import { View, Image, TextInput, ActivityIndicator } from 'react-native'
import { debounce } from 'lodash'

import { GridBook, tw } from '../../components'
import { useSearchBook } from '../../hooks'
import { Text } from '@rneui/themed'

export const Search = memo(() => {
  const [textSearch, setTextSearch] = useState('')
  const { status, data, error, isFetching, isLoading } = useSearchBook(textSearch)
  console.log('data', data)
  // handle debouce search when user onpress
  const handleSearch = useCallback(
    debounce((text) => {
      setTextSearch(text)
    }, 400),
    [],
  )

  return (
    <View style={tw`flex-1`}>
      <View style={tw`m-16px`}>
        <View
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            height: 40,
            alignSelf: 'center',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image style={{ width: 20, height: 20, marginLeft: 16 }} source={require('../..//asset/search.png')} />
          <View style={tw`pl-12px`}>
            <TextInput
              style={tw`w-full`}
              placeholder="Tìm kiếm sách"
              placeholderTextColor="#808080"
              onChangeText={handleSearch}
            />
          </View>
        </View>
      </View>
      {isLoading && <ActivityIndicator />}
      {(error || (data && data?.length === 0)) && (
        <Text style={tw`text-center mt-30px`}>Không tìm thấy kết quả phù hợp!</Text>
      )}
      <GridBook status={status} data={data} error={error} isFetching={isFetching} />
    </View>
  )
})
