import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { Image } from 'expo-image';
import { Image } from 'react-native';

// import { ImagesAssets } from '../assets/ImagesAssets';

interface Category {
    CategoryID: number;
    CategoryName: string;
    CategoryDescription: string;
    CategoryStatus: boolean;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    categoryContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    categoryName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    categoryImage: {
        width: 200,
        height: 150,
        marginBottom: 10,
    },
});

const CategoryPage = () => {
    // Assume categories state is populated with data from API
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // Fetch categories and set state
        const fetchCategories = async () => {
            try {
                // Fetch categories from API
                const response = await fetch('http://192.168.1.154:3000/categories');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []); // Fetch categories on component mount

    // Function to get the image source path for a category based on its ID
    const getCategoryImageSource = (categoryID: number) => {
        return `../assets/images/category-${categoryID}.png`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>
            {/* <Image source="../assets/images/category-1.png" style={styles.categoryImage} /> */}

            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <View style={styles.categoryContainer}>
                        <Image
                            source={{ uri: getCategoryImageSource(item.CategoryID) }}
                            style={styles.categoryImage}
                        />
                        <Text style={styles.categoryName}>{item.CategoryName}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.CategoryID.toString()}
            />
        </View>
    );
};

export default CategoryPage;
