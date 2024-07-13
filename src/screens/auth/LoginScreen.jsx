import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent, TextComponent } from '../../components'
import { fontFamilies } from '../../constants/appFonts'
import { globalStyle } from '../../styles/globalStyle'

const LoginScreen = () => {
  console.log('đang Login')
  const handleLogin = async () => {
    AsyncStorage.setItem('accessToken', '2918382asd')
    console.log('yes sir')
  }
  return (
    <View style={[globalStyle.container, {
      padding: 16,
    }]}>
      <Text style={{ color: 'red' }}>LoginScreen</Text>

      <TouchableOpacity onPress={handleLogin}>
        <Text>Press me</Text>
      </TouchableOpacity>
      <ButtonComponent text='Login' onPress={handleLogin} />
      <TextComponent text='a' isTitle />

      <ButtonComponent text='Login' type='link' onPress={handleLogin} />
    </View>
  )
}

export default LoginScreen