import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuPage from './MenuPage';
// import CategoryPage from './CategoryPage';

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Categories" component={MenuPage} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;
