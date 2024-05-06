import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Category {
    CategoryID: number;
    CategoryName: string;
    CategoryDescription: string;
    CategoryStatus: boolean;
}

const MenuPage = () => {
    const navigation = useNavigation(); // Get navigation object
    const [categoryId, setCategoryId] = useState('');
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

    const goToCategoryScreen = (categoryId: string) => {
        (navigation as any).navigate('CategoryPage', {
            categoryId: categoryId,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setCategoryId(item.CategoryID.toString());
                            goToCategoryScreen(item.CategoryID.toString());
                        }}
                        style={styles.categoryContainer}
                    >
                        <Text style={styles.categoryName}>{item.CategoryName}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.CategoryID.toString()}
            />
        </View>
    );
};

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
});

export default MenuPage;
