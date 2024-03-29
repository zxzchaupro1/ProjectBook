import React, { memo, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button } from '@rneui/themed'
import { StorageKeys } from '../../constants'
import { GridBook, tw } from '../../components'
import { Screen } from 'react-native-screens'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

const tabs = [
  {
    label: 'Đang đọc',
    value: 0,
  },
  {
    label: 'Sách yêu thích',
    value: 1,
  },
  {
    label: 'Đã đọc',
    value: 2,
  },
]

export const Library = memo(() => {
  const [index, setIndex] = useState(0)

  const { getItem } = useAsyncStorage(StorageKeys.favourite)
  const { getItem: getBookReading } = useAsyncStorage(StorageKeys.reading)
  const { getItem: getBookReaded } = useAsyncStorage(StorageKeys.readed)

  const [books, setBooks] = useState([])

  const getItemsBook = async (key = 0) => {
    try {
      switch (key) {
        case 1:
          const books_favourite = await getItem()
          if (books_favourite) {
            const parse = JSON.parse(books_favourite)
            setBooks(parse)
            return
          }
          setBooks([])
          break
        case 2:
          const books_readed = await getBookReaded()
          if (books_readed) {
            const parse = JSON.parse(books_readed)
            setBooks(parse)
            return
          }
          setBooks([])
          break

        default:
          const books_reading = await getBookReading()
          if (books_reading) {
            const parse = JSON.parse(books_reading)
            setBooks(parse)
            return
          }
          setBooks([])
          break
      }
    } catch (error) {
      console.log('get book library error', error)
    }
  }

  const handleChangeTab = async (tab) => {
    setIndex(tab)
    await getItemsBook(tab)
  }

  useFocusEffect(
    React.useCallback(() => {
      ;(async () => {
        await getItemsBook(index)
      })()
    }, []),
  )
  return (
    <Screen style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row items-center bg-white p-8px border-t border-grayscale-border`}>
        {tabs.map((tab) => (
          <Button
            title={tab.label}
            size="sm"
            containerStyle={tw`mr-12px`}
            buttonStyle={tw`h-32px px-12px rounded ${
              index === tab.value ? '' : 'bg-white border border-grayscale-border'
            }`}
            titleStyle={tw`${index === tab.value ? 'text-white' : 'text-grayscale-black'}`}
            onPress={() => handleChangeTab(tab.value)}
            key={tab.value}
          />
        ))}
      </View>
      <GridBook data={books} />
    </Screen>
  )
})
