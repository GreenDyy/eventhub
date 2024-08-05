import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, removeAuth } from '../../srcRedux/reducers/authReducer'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager } from 'react-native-fbsdk-next'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const auth = useSelector(authSelector)
  console.log('đang Home')

  const handleLogout = async () => {
    dispatch(removeAuth({}))
    await AsyncStorage.removeItem('auth')
    await GoogleSignin.signOut()
    LoginManager.logOut()
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Text>{auth?.email}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen