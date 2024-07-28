import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, removeAuth } from '../../srcRedux/reducers/authReducer'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const auth = useSelector(authSelector)
  console.log('đang Home')

  const handleLogout = async () => {
    dispatch(removeAuth({}))
    await AsyncStorage.removeItem('auth')
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