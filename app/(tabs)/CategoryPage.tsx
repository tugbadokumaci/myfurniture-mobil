import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import DetailPage from './DetailPage'; // Import the detail page component

interface Product {
  ProductID: number;
  ProductName: string;
  ProductDescription: string;
  ProductStatus: boolean;
  ProductPrice: number;
  ProductImage: string;
}

const CategoryPage = () => {
  const navigation = useNavigation();

  const route = useRoute();
  var categoryId = (route.params as { categoryId?: number })?.categoryId ?? null;

  const [products, setProducts] = useState<Product[]>([]);
  const navigateToProductDetail = (product: Product) => {
    (navigation as any).navigate('DetailPage', { productId: product.ProductID });
  };
  useEffect(() => {
    // Fetch data only if categoryId is not null
    if (categoryId !== null) {
      fetchData();
    }
    else {
    }
  }, [categoryId]); // Make sure to include categoryId in the dependency array


  const fetchData = async () => {
    try {
      // const categoryIdNumber = parseInt(categoryId ?? '');
      const response = await fetch(`http://192.168.1.154:3000/categories/${categoryId}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('API request failed:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products ({products.length} total)</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToProductDetail(item)} style={styles.productContainer}>
            <View style={styles.productContainer}>
              <Image
                source={{ uri: item.ProductImage }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{item.ProductName}</Text>
              <Text style={styles.productPrice}>${item.ProductPrice}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.ProductID.toString()}
        numColumns={2} // Display FlatList in 2 columns
        columnWrapperStyle={styles.columnWrapper} // Add some styling for the column wrapper
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  productImage: {
    width: 200,
    height: 150,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
  columnWrapper: {
    justifyContent: 'space-between', // Add space between the columns
  },
});

export default CategoryPage;