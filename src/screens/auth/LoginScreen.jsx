import { View, Text, TouchableOpacity, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { globalStyle } from '../../styles/globalStyle'
import { Lock, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import { images } from '../../constants/images'
import { appFonts } from '../../constants/appFonts'
import SocialLogin from './components/SocialLogin'
const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRemember, setIsRemember] = useState(true)

  const handleLogin = async () => {
    AsyncStorage.setItem('accessToken', '2918382asd')
    console.log('yes sir')
  }

  const handleChangeRemember = () => {
    setIsRemember(!isRemember)
    console.log(isRemember)
  }

  return (
    <ContainerComponent isScroll={true} isImageBackground={true} style={{ paddingVertical: 50 }}>

      <SectionComponent style={{ justifyContent: 'center', alignItem: 'center' }}>
        <Image source={images.logologin} style={{ width: 162, height: 114, alignSelf: 'center' }} resizeMode='contain' />
      </SectionComponent>

      <SectionComponent>
        <TextComponent text={'Sign in'} fontSize={24} isTitle={true} />
        <SpaceComponent height={21} />
        <InputComponent
          value={email}
          placeholder="Email"
          onChangeText={preText => setEmail(preText)}
          affix={<Sms size={22} color={appColors.green2} />}
          allowClear
          keyboardType={'email-address'}
        />

        <InputComponent
          value={password}
          placeholder="Password"
          onChangeText={preText => setPassword(preText)}
          affix={<Lock size={22} color={appColors.green2} />}
          allowClear
          isPassword
        />
        <RowComponent style={{ justifyContent: 'space-between' }}>

          <RowComponent onPress={handleChangeRemember}>
            <Switch
              value={isRemember}
              onChange={handleChangeRemember}
              thumbColor={appColors.white}
              trackColor={{ true: appColors.link }} />
            <TextComponent text='Remember Me' fontFamily={appFonts.airBnBRegular} color='black' />
          </RowComponent>

          <ButtonComponent text='Forgot Password?' type='text' color='black' />

        </RowComponent>

      </SectionComponent>

      <SpaceComponent height={16} />

      <SectionComponent>
        <ButtonComponent text='SIGN IN' type='primary' />
      </SectionComponent>

      <SocialLogin />

      <SectionComponent>
        <RowComponent style={{ justifyContent: 'center' }}>
          <TextComponent text='Already have an account? ' />
          <ButtonComponent text='Sign up' type='link' />
        </RowComponent>
      </SectionComponent>

    </ContainerComponent>


  )
}

export default LoginScreen