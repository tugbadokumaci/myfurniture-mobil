import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Platform, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const carouselItem = require('../assets/carousel.json');
const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };

interface CarouselItems {
    title: string;
    url: string;
    promo: string;
}

type Props = {
    item: CarouselItems;
}



const SliderBanner = () => {

    let flatListRef = useRef<FlatList<CarouselItems> | null>();

    const [currentIndex, setCurrentIndex] = useState(0);

    const onViewRef = useRef(({ changed }: { changed: any }) => {
        if (changed[0].isViewable) {
            setCurrentIndex(changed[0].index);
        }

    });

    const scrollToIndex = (index: number) => {
        flatListRef.current?.scrollToIndex({ animated: true, index: index });

    }

    const renderItems: React.FC<{ item: CarouselItems }> = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => console.log('Clicou no item')}
                activeOpacity={1}
            >
                <Image source={{ uri: item.url }} style={styles.image} />
                <View style={styles.footer}>
                    <Text style={styles.textFooter}>{item.title}</Text>
                    <Text style={styles.textFooter}>{item.promo}</Text>
                </View>
            </TouchableOpacity>


        );
    }

    return (
        <>
            <FlatList
                data={carouselItem}
                renderItem={renderItems}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                ref={(ref) => {
                    flatListRef.current = ref;
                }}
                style={styles.carousel}
                viewabilityConfig={viewConfigRef}
                onViewableItemsChanged={onViewRef.current}
            />

            <View style={styles.dotView}>
                {carouselItem.map(({ }, index: number) => (
                    <TouchableOpacity

                        style={[styles.circle, { backgroundColor: index == currentIndex ? 'black' : 'grey' }]}
                        onPress={() => scrollToIndex(index)}

                    >

                    </TouchableOpacity>
                ))}
            </View>

        </>

    );
}

const styles = StyleSheet.create({
    image: {
        width,
        height: 250,
        resizeMode: 'contain',

    },
    carousel: {
        marginVertical: 10,
        maxHeight: 300,

    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        paddingHorizontal: 40,
        alignItems: 'center',
        backgroundColor: '#000'
    },
    textFooter: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'grey',
        marginHorizontal: 5
    }


});

export default SliderBanner;