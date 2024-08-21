import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import AppRouter from './src/navigators/AppRouter'
import store from './src/srcRedux/store'
import { Host } from 'react-native-portalize'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
  
  return (
    <GestureHandlerRootView>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent={true} />
      <Provider store={store}>
        <Host>
          <NavigationContainer>
            <AppRouter />
          </NavigationContainer>
        </Host>
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App