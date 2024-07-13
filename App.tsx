import { View, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthNavigator from './src/navigators/AuthNavigator'
import SplashScreen from './src/screens/SplashScreen'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'
import MainNavigator from './src/navigators/MainNavigator'

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true)
  const [accessToken, setAccessToken] = useState('')

  const { getItem, setItem } = useAsyncStorage('accessToken')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false)
    }, 1500)

    return () => { clearTimeout(timeout) }
  }, [])


  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('accessToken')
    //nếu có token trong storage thì gắn vào state
    token && setAccessToken(token)
    console.log('token nè', token)
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent={true} />
      {
        isShowSplash ?
          <SplashScreen /> :
          <NavigationContainer>
            {accessToken ? <MainNavigator /> : <AuthNavigator />}
          </NavigationContainer>
      }
    </>
  )
}

export default App