import { View, Text, TouchableOpacity, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { globalStyle } from '../../styles/globalStyle'
import { Lock, Sms, User } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import { images } from '../../constants/images'
import { appFonts } from '../../constants/appFonts'
import SocialLogin from './components/SocialLogin'
const SignUpScreen = ({ navigation }) => {

  const [profile, setprofile] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChangeValue = (key, value) => {
    let data = { ...profile }
    data[key] = value
    setprofile(data)
  }

  return (
    <ContainerComponent isScroll={true} isImageBackground={true} back title='Sign up'>
      <SpaceComponent height={50} />

      <SectionComponent>
        <TextComponent text={'Sign up'} fontSize={24} isTitle={true} />
        <SpaceComponent height={21} />
        <InputComponent
          value={profile?.username}
          placeholder="Full name"
          onChangeText={preText => handleChangeValue('username', preText)}
          affix={<User size={22} color={appColors.green2} />}
          allowClear
          keyboardType={'email-address'}
        />

        <InputComponent
          value={profile?.email}
          placeholder="Email"
          onChangeText={preText => handleChangeValue('email', preText)}
          affix={<Sms size={22} color={appColors.green2} />}
          allowClear
          keyboardType={'email-address'}
        />

        <InputComponent
          value={profile?.password}
          placeholder="Password"
          onChangeText={preText => handleChangeValue('password', preText)}
          affix={<Lock size={22} color={appColors.green2} />}
          allowClear
          isPassword
        />

        <InputComponent
          value={profile?.confirmPassword}
          placeholder="Confirm password"
          onChangeText={preText => handleChangeValue('confirmPassword', preText)}
          affix={<Lock size={22} color={appColors.green2} />}
          allowClear
          isPassword
        />

      </SectionComponent>

      <SpaceComponent height={16} />

      <SectionComponent>
        <ButtonComponent text='SIGN UP' type='primary' />
      </SectionComponent>

      <SocialLogin />

      <SectionComponent>
        <RowComponent style={{ justifyContent: 'center' }}>
          <TextComponent text={"Don't have an account? "} />
          <ButtonComponent text='Sign in' type='link' onPress={() => navigation.navigate('LoginScreen')} />
        </RowComponent>
      </SectionComponent>

    </ContainerComponent>
  )
}

export default SignUpScreen