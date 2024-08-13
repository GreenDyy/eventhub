import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EventDetailScreen, HomeScreen, SearchEvent } from '../screens'

const ExplorerNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='SearchEvent' component={SearchEvent} />
            <Stack.Screen name='EventDetailScreen' component={EventDetailScreen} />
        </Stack.Navigator>
    )
}

export default ExplorerNavigator