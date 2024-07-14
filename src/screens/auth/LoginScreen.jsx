import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent, InputComponent, TextComponent } from '../../components'
import { globalStyle } from '../../styles/globalStyle'
import { Lock, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    AsyncStorage.setItem('accessToken', '2918382asd')
    console.log('yes sir')
  }

  return (
    <View style={[globalStyle.container, { alignItems: 'center', justifyContent: 'center', padding: 20 }]}>
      <View style={{}}>
        <InputComponent
          value={email}
          placeholder="Email"
          onChangeText={preText => setEmail(preText)}
          affix={<Sms size={22} color={appColors.green2} />}
          allowClear
        />

        <InputComponent
          value={password}
          placeholder="Password"
          onChangeText={preText => setPassword(preText)}
          affix={<Lock size={22} color={appColors.green2} />}
          allowClear
          isPassword
        />
      </View>
    </View>
  )
}

export default LoginScreen