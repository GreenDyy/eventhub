import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen, SearchEvent } from '../screens'

const ExplorerNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='SearchEvent' component={SearchEvent} />
        </Stack.Navigator>
    )
}

export default ExplorerNavigator