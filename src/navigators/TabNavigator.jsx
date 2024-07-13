import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../screens'

const TabNavigator = () => {
    const Tab = createBottomTabNavigator()
    console.log('vừa load TabNavigator')
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name='HomeScreen' component={HomeScreen} />
        </Tab.Navigator>
    )
}

export default TabNavigator