import React, { useRef } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native'
import Carousel from 'react-native-anchor-carousel'

const { width: windowWidth } = Dimensions.get('window')
const SEPARATOR_WIDTH = 2
export const CategoryBook = ({ data, topic, itemWidth }) => {
  const carouselRef = useRef(null)

  function renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.name}>{topic}</Text>
      </View>
    )
  }

  function renderItem({ item, index }) {
    const { imageBook: image, name: title, author } = item
    return (
      <Pressable
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index)
        }}
      >
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.lowerContainer}>
          <View style={styles.lowerLeft}>
            <Text style={styles.name} numberOfLines={2}>
              {title}
            </Text>
            <Text style={styles.descriptionText} numberOfLines={1}>
              {author}
            </Text>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      {topic && renderHeader()}
      <Carousel
        keyExtractor={(item) => item?._id}
        style={[styles.carousel, styles.content]}
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        itemWidth={(itemWidth ? itemWidth : 0.6) * windowWidth}
        separatorWidth={SEPARATOR_WIDTH}
        inActiveScale={1}
        inActiveOpacity={1}
        containerWidth={windowWidth}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {},
  container: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    height: 'auto',
  },
  carousel: {
    width: windowWidth,
    flexGrow: 0,
  },
  item: {
    backgroundColor: 'white',
    height: '100%',
  },
  image: {
    width: 120,
    aspectRatio: 1 / 2,
    borderRadius: 10,
    padding: 16,
  },
  lowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  lowerLeft: {
    width: '50%',
  },
  descriptionText: {
    fontSize: 12,
    color: '#676E72',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    borderColor: '#A0A0A0',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#202C38',
  },
})
