import { Lock, Sms } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, Image, Switch } from 'react-native'
import authenticationAPI from '../../apis/authApis'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { appFonts } from '../../constants/appFonts'
import { images } from '../../constants/images'
import { LoadingModal } from '../../modals'
import { Validate } from '../../utils/validate'
import SocialLogin from './components/SocialLogin'
import { useDispatch } from 'react-redux'
import { addAuth } from '../../srcRedux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRemember, setIsRemember] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const getEmail = async () => {
      const semail = await AsyncStorage.getItem('email')
      setEmail(semail)
    }
    getEmail()
  }, [])

  const handleLogin = async () => {
    const emailValidate = Validate.Email(email)
    if (emailValidate) {
      try {
        const res = await authenticationAPI.handleAuthentication('/login', { email, password }, 'post')
        setIsLoading(false)
        dispatch(addAuth(res.data))
        await AsyncStorage.setItem('auth', isRemember ? JSON.stringify(res.data) : email)
      }
      catch (e) {
        console.log(e)
        console.log()
        setIsLoading(false)
        Alert.alert('Vào ko dc')
      }
    }
    else {
      Alert.alert('Email không hợp lệ')
    }
  }

  const handleChangeRemember = async () => {
    setIsRemember(!isRemember)
    await AsyncStorage.setItem('email', email)
    console.log(isRemember)
  }

  return (
    <ContainerComponent isScroll={true} isImageBackground={true}>
      <SpaceComponent height={50} />
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

        <SpaceComponent height={20} />

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

          <ButtonComponent text='Forgot Password?' type='text' color='black' onPress={() => navigation.navigate('ForgotPasswordScreen')} />

        </RowComponent>

      </SectionComponent>

      <SpaceComponent height={16} />

      <SectionComponent>
        <ButtonComponent text='SIGN IN' type='primary' onPress={handleLogin} />
      </SectionComponent>

      <SocialLogin />

      <SectionComponent>
        <RowComponent style={{ justifyContent: 'center' }}>
          <TextComponent text='Already have an account? ' />
          <ButtonComponent text='Sign up' type='link' onPress={() => navigation.navigate('SignUpScreen')} />
        </RowComponent>
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  )
}

export default LoginScreen