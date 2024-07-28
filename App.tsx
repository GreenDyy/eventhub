import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import AppRouter from './src/navigators/AppRouter'
import store from './src/srcRedux/store'

const App = () => {


  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent={true} />
      <Provider store={store}>
        <NavigationContainer>
          <AppRouter />
        </NavigationContainer>
      </Provider>

    </>
  )
}

export default App