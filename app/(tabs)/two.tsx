import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

interface Product {
  ProductID: number;
  ProductName: string;
  ProductPrice: number;
  ProductImage: string;
}

const TabTwoScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  var detailinfo = "";
  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.154:3000/products');
      const data = await response.json();
      detailinfo = data;
      setProducts(data);
    } catch (error) {
      console.error('API request failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <Text>uzunluk = {products.length}</Text>
      <Text>detailinfo = {detailinfo}</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image
              source={{ uri: item.ProductImage }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{item.ProductName}</Text>
            <Text style={styles.productPrice}>${item.ProductPrice}</Text>
          </View>
        )}
        keyExtractor={(item) => item.ProductID.toString()}
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
});
