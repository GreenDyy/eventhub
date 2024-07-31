import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { LoginScreen, OnBoardingScreen, SignUpScreen, ForgotPasswordScreen, VerificationScreen } from '../screens/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [firstTime, setFirstTime] = useState(null); // Đặt trạng thái ban đầu là null để biết khi nào kiểm tra xong

  useEffect(() => {
    checkFirstTimeOnApp();
  }, []);

  const checkFirstTimeOnApp = async () => {
    const firstTimeValue = await AsyncStorage.getItem('firstTimeOpenApp');
    if (!firstTimeValue) {
      setFirstTime(true); // Lần đầu mở ứng dụng
      await AsyncStorage.setItem('firstTimeOpenApp', 'false'); // Đặt giá trị để không hiển thị màn onboarding lần sau
      console.log(firstTime)
    } else {
      setFirstTime(false); // Không phải lần đầu mở ứng dụng
    }
  };

  if (firstTime === null) {
    // Có thể thêm một màn hình hoặc một loader khi đang kiểm tra
    return null; // Hoặc có thể trả về một spinner/loader
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}
    >
      {firstTime && <Stack.Screen name='OnBoardingScreen' component={OnBoardingScreen} />}
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
      <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
      <Stack.Screen name='VerificationScreen' component={VerificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
