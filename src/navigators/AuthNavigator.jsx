import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { LoginScreen, OnBoardingScreen, SignUpScreen, ForgotPasswordScreen, VericationScreen } from '../screens/index'


const AuthNavigator = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'flip'
        }}>
            <Stack.Screen name='OnBoardingScreen' component={OnBoardingScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
            <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
            <Stack.Screen name='VericationScreen' component={VericationScreen} />

        </Stack.Navigator>
    )
}

export default AuthNavigator