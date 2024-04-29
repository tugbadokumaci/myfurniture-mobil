import React, { useRef, useState } from 'react';
import { StyleSheet, Image, FlatList, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';


import EditScreenInfo from '@/components/EditScreenInfo';

const carouselItems: CarouselItem[] = [


  {
    title: 'Dining Room Furnitures',
    image: 'https://www.my-furniture.com/media/wysiwyg/slideshow/alveare-silver.jpg',
    promo: '$9,999',
  },
  {
    title: 'Living Room Furnitures',
    image: 'https://www.my-furniture.com/media/wysiwyg/slideshow/equinox.jpg',
    promo: '$5,430',
  },
  {
    title: 'Welcome Area Furnitures',
    image: 'https://www.my-furniture.com/media/wysiwyg/slideshow/essen-chenile.jpg',
    promo: '$7,770',
  },
  {
    title: 'Bedroom Furnitures',
    image: 'https://www.my-furniture.com/media/wysiwyg/slideshow/lexington.jpg',
    promo: '$1,250',
  },
  {
    title: 'Entryway Furnitures',
    image: 'https://www.my-furniture.com/media/wysiwyg/slideshow/essex.jpg',
    promo: '$3,490',
  },

];

const { width, height } = Dimensions.get('window');

interface CarouselItem {
  title: string;
  image: string;
  promo: string;
}

export default function TabOneScreen() {
  const flatListRef = useRef<FlatList<CarouselItem> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: any }) => {
    setCurrentIndex(viewableItems[0]?.index ?? 0);
  });

  const viewabilityConfigRef = useRef({ viewAreaCoveragePercentThreshold: 95 });

  const renderItems = ({ item }: { item: CarouselItem }) => {
    return (
      <TouchableOpacity onPress={() => console.log('clicked')} activeOpacity={1}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>{item.title}</Text>
          <Text style={styles.footerText}>{item.promo}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <FlatList
        data={carouselItems}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={(ref) => (flatListRef.current = ref)}
        style={styles.carousel}
        viewabilityConfig={viewabilityConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
      />
      <View style={styles.dotView}>
        {carouselItems.map((_: any, index: number) => (
          <TouchableOpacity
            key={index.toString()}
            style={[
              styles.circle,
              { backgroundColor: index === currentIndex ? 'black' : 'grey' },
            ]}
            onPress={() => {
              flatListRef.current?.scrollToIndex({ index, animated: true });
            }}
          />
        ))}
      </View>
      <View style={styles.separator} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carousel: {
    marginVertical: 10,
    maxHeight: 300,

  },
  image: {
    width,
    height: 250,
    resizeMode: 'contain',

  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#C8A19A',
  },
  footerText: {
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
