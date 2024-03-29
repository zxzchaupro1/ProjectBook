import { useState, memo, useCallback } from 'react'
import { View, Image, TextInput, ActivityIndicator } from 'react-native'
import { debounce } from 'lodash'

import { GridBook, tw } from '../../components'
import { useSearchBook } from '../../hooks'
import { Text } from '@rneui/themed'
import { FontAwesome } from '@expo/vector-icons'

export const Search = memo(() => {
  const [textSearch, setTextSearch] = useState('')
  const { status, data, error, isFetching, isLoading } = useSearchBook(textSearch)

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
          <FontAwesome name="search" size={24} style={{ marginLeft: 16 }} />
          <TextInput
            style={tw`w-full h-[36px] pl-[16px]`}
            placeholder="Tìm kiếm sách"
            placeholderTextColor="#808080"
            onChangeText={handleSearch}
          />
        </View>
      </View>
      {isLoading && <ActivityIndicator />}
      {(error || (data && data?.length === 0)) && (
        <Text style={tw`text-center mt-30px`}>Không tìm thấy kết quả phù hợp!</Text>
      )}
      <GridBook status={status} data={data} error={error} isFetching={isLoading || isFetching} />
    </View>
  )
})
