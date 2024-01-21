import React, { memo, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ImageBackground } from 'react-native'
import Carousel from 'react-native-anchor-carousel'
import SimplePaginationDot from './SimplePaginationDot'
import { useQueryBanners } from '../../hooks/queries'
import { tw } from '../tw'
import { getUrlImage } from '../../utils/image'

const { width: windowWidth } = Dimensions.get('window')

const INITIAL_INDEX = 0
export const Banner = memo((props) => {
  const carouselRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX)

  const { data = [], isLoading, isFetching, isError, error } = useQueryBanners()

  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index)
  }

  function renderItem({ item, index }) {
    const { homeImage: uri } = item
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index)
        }}
      >
        <ImageBackground source={{ uri: getUrlImage(uri) }} style={styles.imageBackground} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      {isLoading || isFetching ? (
        <View style={tw`flex justify-center items-center`}>
          <Text>Đang tải...</Text>
        </View>
      ) : null}
      {isError ? <Text>{error.message}</Text> : null}
      <Carousel
        style={styles.carousel}
        data={data}
        renderItem={renderItem}
        itemWidth={windowWidth}
        inActiveOpacity={0}
        containerWidth={windowWidth}
        onScrollEnd={handleCarouselScrollEnd}
        ref={carouselRef}
      />
      {/* <SimplePaginationDot currentIndex={currentIndex} length={data.length} /> */}
    </View>
  )
})

const styles = StyleSheet.create({
  container: { backgroundColor: '#1f2024', paddingVertical: 20 },
  carousel: {
    backgroundColor: '#1f2024',
    aspectRatio: 1.5,
    flexGrow: 0,
    marginBottom: 20,
  },
  item: {
    borderWidth: 2,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 5,
    borderColor: '#fff',
    elevation: 3,
  },
  imageBackground: {
    flex: 2,
    backgroundColor: '#fff',
    borderWidth: 5,
    borderColor: '#fff',
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightText: { color: 'white' },
  lowerContainer: {
    flex: 1,
    margin: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#191970',
  },
  contentText: {
    marginTop: 10,
    fontSize: 12,
    color: '#191970',
  },
})
