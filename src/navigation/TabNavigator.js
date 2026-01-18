import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import ProductList from "../screens/ProductList";
import ProductForm from "../screens/ProductForm";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#06beaf',
                tabBarInactiveTintColor: '#999',
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
                tabBarStyle: { 
                    height: 60, 
                    paddingTop: 6  
                },
            }}
        >

            <Tab.Screen
                name='Produtos'
                component={ProductList}
                options={{
                    tabBarLabel: 'Produtos',
                    tabBarIcon: ({ color }) => (
                        <Text style={{ color, fontSize: 18 }}>📦</Text>
                    ),
                }}
            />
            
            <Tab.Screen
                name="Adicionar"
                component={ProductForm}
                options={{
                    tabBarLabel: 'Adicionar',
                    tabBarIcon: ({ color }) => (
                        <Text style={{ color, fontSize: 18 }}>➕</Text>
                    ),
                }}
            />
            
        </Tab.Navigator>
    );
}
