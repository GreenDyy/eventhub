import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import DrawerNavigator from './DrawerNavigator'
import { EventDetailScreen } from '../screens'

const MainNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Main' component={DrawerNavigator} />
            <Stack.Screen name='EventDetailScreen' component={EventDetailScreen} />
        </Stack.Navigator>
    )
}

export default MainNavigator