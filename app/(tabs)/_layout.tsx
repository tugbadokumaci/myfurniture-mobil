import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, } from 'expo-router';
import { Pressable } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

import CategoryPage from './CategoryPage'; // Import the detail page component

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}



export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerTintColor: Colors[colorScheme ?? 'light'].text, // Set header text color

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home Page',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="phone"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="MenuPage"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="DetailPage"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                (navigation as any).navigate('CategoryPage');
              }}
            />
          )
        }}
      />
      <Tabs.Screen
        name="CategoryPage"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                (navigation as any).navigate('MenuPage');
              }}
            />
          )
        }}
      />

    </Tabs>
  );
}
