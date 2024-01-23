import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Divider, Icon, Text } from '@rneui/themed'
import { ScrollView, View, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { tw } from '../../components'
import { AppRouter, StorageKeys } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { showMessage } from 'react-native-flash-message'
import { getUrlImage } from '../../utils/image'
import { useQueryAdsRandom } from '../../hooks/queries/ads'

export const BookDetail = memo(({ route }) => {
  const navigation = useNavigation()
  const { getItem, setItem } = useAsyncStorage(StorageKeys.favourite)

  const { data: ads } = useQueryAdsRandom()

  const [favourties, setFavourties] = useState([])
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showCloseButton, setShowCloseButton] = useState(false)
  const [countdown, setCountdown] = useState(5)

  const book = useMemo(() => route?.params?.item, [route])

  const readItemFromStorage = async () => {
    const item = await getItem()
    if (item) {
      const parse = JSON.parse(item)
      setFavourties(parse)
    }
  }

  const handleRedirect = () => {
    setIsFullScreen(false)
    navigation.navigate(AppRouter.bookView, {
      url: book.content,
      headerTitle: book.bookName,
      item: book,
    })
  }

  const handleOpenAdvertising = useCallback(() => {
    setIsFullScreen(true)
    // Show the countdown from 5 to 0 before showing the close button
    const intervalId = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1)
    }, 1000)

    // After 5 seconds, hide the countdown and show the close button
    setTimeout(() => {
      clearInterval(intervalId)
      setShowCloseButton(true)
    }, 5000)
  }, [])

  const handleSetBookFavourite = async () => {
    try {
      let newFavourite = [...favourties]
      const isExist = newFavourite.find((items) => items._id === book._id)
      if (!isExist) {
        newFavourite = [...newFavourite, book]
      } else {
        newFavourite = newFavourite.filter((favourtie) => favourtie._id !== book._id)
      }
      await setItem(JSON.stringify(newFavourite), async (error) => {
        if (error) {
          showMessage({
            message: 'Thêm sách yêu thích thất bại',
            type: 'danger',
          })
          return
        }
        if (!isExist) {
          showMessage({
            message: 'Thêm sách yêu thích thành công',
            type: 'success',
          })
        }

        await readItemFromStorage()
      })
    } catch (e) {
      // save error
      console.log('error-save-book-favourite', e)
    }
  }

  useEffect(() => {
    readItemFromStorage()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageParent}>
          <Image source={{ uri: getUrlImage(book.image1) }} style={styles.image} />
        </View>
        <View style={styles.header}></View>
        <View>
          <View style={styles.containerBackground}>
            <Text style={tw`text-center text-18px font-semibold`}>{book.bookName}</Text>
            <Text style={tw`text-center text-14px text-grayscale-light pb-16px`}>{book.author.authorName}</Text>

            <View
              style={tw`mx-16px border-t border-b border-grayscale-border flex-row justify-around items-center py-16px text-center mb-[12px]`}
            >
              <View>
                <Text style={tw`text-14px font-normal text-center`}>{book.pages || 200} </Text>
                <Text style={tw`text-13px text-grayscale-light text-center`}>Trang</Text>
              </View>
              <Divider color="#EEEEEE" width={1} orientation="vertical" />
              <View>
                <Text style={tw`text-14px font-normal text-center`}>{(book.view && book.view + 'k') || '911,4k'}</Text>
                <Text style={tw`text-13px text-grayscale-light text-center`}>Lượt đọc</Text>
              </View>
              <Divider color="#EEEEEE" width={1} orientation="vertical" />
              <View>
                <Text style={tw`text-14px font-normal text-center`}>{(book.heart && book.heart + 'k') || '19,1k'}</Text>
                <Text style={tw`text-13px text-grayscale-light text-center`}>Yêu thích</Text>
              </View>
            </View>
            <Text style={tw`my-2px px-24px`}>Thể loại: {' ' + book.genre.genreName}</Text>
            <Text style={tw`my-2px px-24px`}>Ngôn ngữ: {' ' + book.language}</Text>
            <Text style={tw`my-2px px-24px`}>Mô tả: {' ' + book.bookDetails}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={tw`flex-row justify-between items-center w-full bg-white py-16px border-t border-grayscale-border`}>
        <View style={tw`pl-16px`}>
          <Button
            title={'Đọc sách'}
            size="sm"
            buttonStyle={tw`w-full h-38px`}
            titleStyle={tw`text-white`}
            onPress={handleOpenAdvertising}
          />
        </View>
        <View style={tw`pr-16px`}>
          <Button
            title={
              <Icon
                name="heart"
                type="font-awesome"
                color={!!favourties.find((p) => p._id === book._id) ? 'red' : 'pink'}
              />
            }
            size="sm"
            buttonStyle={tw`w-6/12 h-38px  bg-white border border-grayscale-border`}
            titleStyle={tw`text-white`}
            onPress={handleSetBookFavourite}
          />
        </View>
      </View>
      {isFullScreen && (
        <Modal animationType="slide" transparent={false}>
          <View style={styles.fullScreenContainer}>
            <Image
              source={{ uri: getUrlImage(ads?.adsImage ?? '') }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
            {showCloseButton ? (
              <TouchableOpacity style={styles.closeButton} onPress={handleRedirect}>
                <Button type="clear" title="Đóng" onPress={handleRedirect} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.closeButton}>
                <Button type="clear" title={countdown.toString()} />
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2089dc',
  },
  containerBackground: {
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 120,
  },
  imageParent: {
    zIndex: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 60,
    left: 0,
    right: 0,
  },
  image: {
    width: 160,
    height: 240,
    borderRadius: 10,
  },
  header: {
    height: 200,
    backgroundColor: '#2089dc',
  },
  ImageBackground: {
    flex: 1,
    justifyContent: 'center',
    opacity: 0.9,
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 34,
    right: 28,
  },
})
