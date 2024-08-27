import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import AppRouter from './src/navigators/AppRouter'
import store from './src/srcRedux/store'
import { Host } from 'react-native-portalize'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import FlashMessage from "react-native-flash-message";

const App = () => {
  
  return (
    <GestureHandlerRootView>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent={true} />
      <Provider store={store}>
        <Host>
          <NavigationContainer>
            <AppRouter />
            <FlashMessage position="top" /> 
          </NavigationContainer>
        </Host>
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App