import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Image, FlatList, TouchableOpacity, View, Text, Dimensions, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface Product {
  ProductID: number;
  ProductName: string;
  ProductDescription: string;
  ProductStatus: boolean;
  ProductPrice: number;
  ProductImage: string;
}
import EditScreenInfo from '@/components/EditScreenInfo';

const carouselItems: CarouselItem[] = [


  {
    title: 'Yemek Odası Mobilyaları',
    image: 'https://www.my-furniture.com/media/wysiwyg/slideshow/alveare-silver.jpg',
    promo: '50.400 TL',
  },
  {
    title: 'Oturma Odası Mobilyaları',
    image: 'https://www.my-furniture.com/media/wysiwyg/slideshow/equinox.jpg',
    promo: '79.300 TL',
  },
  {
    title: 'Giriş Alanı Mobilyaları',
    image: 'https://www.my-furniture.com/media/wysiwyg/slideshow/essen-chenile.jpg',
    promo: '35.500 TL',
  },
  {
    title: 'Yatak Odası Takımları',
    image: 'https://www.my-furniture.com/media/wysiwyg/slideshow/lexington.jpg',
    promo: '49.999 TL',
  },
  {
    title: 'Bekleme Alanı Mobilyaları',
    image: 'https://www.my-furniture.com/media/wysiwyg/slideshow/essex.jpg',
    promo: '56.000 TL',
  },

];

const { width, height } = Dimensions.get('window');

interface CarouselItem {
  title: string;
  image: string;
  promo: string;
}

export default function TabOneScreen() {
  const [products, setProducts] = useState<Product[]>([]);

  const flatListRef = useRef<FlatList<CarouselItem> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: any }) => {
    setCurrentIndex(viewableItems[0]?.index ?? 0);
  });
  useEffect(() => {
    fetch('http://192.168.1.154:3000/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);
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
  const renderItems2 = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity onPress={() => console.log('clicked')} activeOpacity={1}>
        <Image source={{ uri: item.ProductImage }} style={styles.image} />
        <View style={styles.index_page_products}>
          <Text style={styles.footerText}>{item.ProductName}   </Text>
          <Text style={styles.footerText}>Şimdi: {item.ProductPrice} TL</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
        <View style={[styles.leftcontainer, { paddingLeft: 20, paddingRight: 20 }]}>
          <Text style={styles.TitleText}>%15 İndirimli Ürünler</Text>
          <FlatList
            data={products}
            renderItem={renderItems2}
            keyExtractor={(item) => item.ProductName}
            pagingEnabled
            scrollEnabled={false}

          />
        </View>

        <View style={styles.separator} />
        {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  leftcontainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'left',
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
  index_page_products: {
    flexDirection: 'row',
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
  TitleText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left'
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