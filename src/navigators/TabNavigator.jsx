import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ExplorerNavigator from './ExplorerNavigator'

const TabNavigator = () => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name='Explorer' component={ExplorerNavigator} />
        </Tab.Navigator>
    )
}

export default TabNavigator