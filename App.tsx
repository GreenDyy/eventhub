import { View, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthNavigator from './src/navigators/AuthNavigator'
import SplashScreen from './src/screens/SplashScreen'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false)
    }, 1500)

    return () => { clearTimeout(timeout) }
  }, [])

  return (
    <View>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent={true} />
      {
        !isShowSplash ?
          <SplashScreen /> :
          <NavigationContainer>
            <AuthNavigator />
          </NavigationContainer>
      }
    </View>

  )
}

export default App