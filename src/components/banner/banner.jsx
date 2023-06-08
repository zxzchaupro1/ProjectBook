import React, { memo, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ImageBackground } from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import SimplePaginationDot from './SimplePaginationDot';

const { width: windowWidth } = Dimensions.get('window');

const data = [
    {
        uri: 'https://i.imgur.com/GImvG4q.jpg',
        title: 'Lorem ipsum dolor sit amet',
        content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    },
    {
        uri: 'https://i.imgur.com/Pz2WYAc.jpg',
        title: 'Lorem ipsum ',
        content: 'Neque porro quisquam est qui dolorem ipsum ',
    },
    {
        uri: 'https://i.imgur.com/IGRuEAa.jpg',
        title: 'Lorem ipsum dolor',
        content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    },
    {
        uri: 'https://i.imgur.com/fRGHItn.jpg',
        title: 'Lorem ipsum dolor',
        content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
    },
    {
        uri: 'https://i.imgur.com/WmenvXr.jpg',
        title: 'Lorem ipsum ',
        content: 'Neque porro quisquam est qui dolorem ipsum quia dolor ',
    },
];

const INITIAL_INDEX = 0;
export const Banner = memo((props) => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

    function handleCarouselScrollEnd(item, index) {
        setCurrentIndex(index);
    }

    function renderItem({ item, index }) {
        const { uri, title, content } = item;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.item}
                onPress={() => {
                    carouselRef.current.scrollToIndex(index);
                }}
            >
                <ImageBackground source={{ uri: uri }} style={styles.imageBackground} />
                <View style={styles.lowerContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.contentText}>{content}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <Carousel
                style={styles.carousel}
                data={data}
                renderItem={renderItem}
                itemWidth={0.7 * windowWidth}
                inActiveOpacity={0.3}
                containerWidth={windowWidth}
                onScrollEnd={handleCarouselScrollEnd}
                ref={carouselRef}
            />
            <SimplePaginationDot currentIndex={currentIndex} length={data.length} />
        </View>
    );
});

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
        color: '#191970'
    },
    contentText: {
        marginTop: 10,
        fontSize: 12,
        color: '#191970'

    },
});
