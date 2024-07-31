import AsyncStorage from '@react-native-async-storage/async-storage'
import { Lock, Sms, User } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authenticationAPI from '../../apis/authApis'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { LoadingModal } from '../../modals'
import { addAuth } from '../../srcRedux/reducers/authReducer'
import { Validate } from '../../utils/validate'
import SocialLogin from './components/SocialLogin'

const initRrrorMessProfile = {
  messUsername: '',
  messEmail: '',
  messPassword: '',
  messConfirmPassword: ''
}

const SignUpScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMess, setErrorMess] = useState()
  const [profile, setprofile] = useState({
    username: 'duy',
    email: 'duyxanh2002@gmail.com',
    password: '123456Aa@',
    confirmPassword: '123456Aa@',
  })

  const [errorMessProfile, setErrorMessProfile] = useState(initRrrorMessProfile)
  const [isFormValid, setIsFormValid] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      profile.username &&
      profile.email &&
      profile.password &&
      profile.confirmPassword &&
      !errorMessProfile.messUsername &&
      !errorMessProfile.messEmail &&
      !errorMessProfile.messPassword &&
      !errorMessProfile.messConfirmPassword
    ) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }, [profile, errorMessProfile])

  const validateForm = (key) => {
    let tempData = { ...errorMessProfile }
    switch (key) {
      case 'username':
        if (!profile.username) {
          tempData['messUsername'] = 'Vui lòng nhập tên người dùng'
        }
        else {
          tempData['messUsername'] = ''
        }
        break
      // cac truong hop cho email
      case 'email':
        if (!profile.email) {
          tempData['messEmail'] = 'Vui lòng nhập email'
        }
        else if (!Validate.Email(profile.email)) {
          tempData['messEmail'] = 'Email không đúng dịnh dạng'
        }
        else {
          tempData['messEmail'] = ''
        }
        break

      case 'password':
        if (!profile.password) {
          tempData['messPassword'] = 'Vui lòng nhập mật khẩu'
        }
        else if (!Validate.Password(profile.password)) {
          tempData['messPassword'] = 'Mật khẩu không đúng dịnh dạng'
        }
        else {
          tempData['messPassword'] = ''
        }
        break

      case 'confirmPassword':
        if (!profile.confirmPassword) {
          tempData['messConfirmPassword'] = 'Vui lòng nhập lại mật khẩu'
        }
        else if (profile.confirmPassword !== profile.password) {
          tempData['messConfirmPassword'] = 'Xác nhận mật khẩu không khớp'
        }
        else {
          tempData['messConfirmPassword'] = ''
        }
        break

      default:
        break
    }
    setErrorMessProfile(tempData)
  }

  const handleChangeValue = (key, value) => {
    let data = { ...profile }
    data[key] = value
    setprofile(data)
  }

  const handleRegister = async () => {
    setIsLoading(true)
    const api = '/verification'
    try {
      const res = await authenticationAPI.handleAuthentication(api, { email: profile.email }, 'post')
      console.log(res)
      navigation.navigate('VerificationScreen', {
        code: res.data.code,
        ...profile
      })
      setIsLoading(false)
    }
    catch (e) {
      console.log(e)
    }

  }

  return (
    <ContainerComponent isScroll={true} isImageBackground={true} back title='Sign up'>
      <SpaceComponent height={50} />

      <SectionComponent>
        <TextComponent text={'Sign up'} fontSize={24} isTitle={true} />
        <SpaceComponent height={21} />
        {/* validate */}
        <TextComponent text={errorMessProfile.messUsername} color={appColors.danger} style={{ marginVertical: 5 }} />
        <InputComponent
          value={profile?.username}
          placeholder="Full name"
          onChangeText={preText => handleChangeValue('username', preText)}
          affix={<User size={22} color={appColors.green2} />}
          allowClear
          keyboardType={'email-address'}
          onEndEditing={() => validateForm('username')}
        />

        {/* validate */}
        <TextComponent text={errorMessProfile.messEmail} color={appColors.danger} style={{ marginVertical: 5 }} />
        <InputComponent
          value={profile?.email}
          placeholder="Email"
          onChangeText={preText => handleChangeValue('email', preText)}
          affix={<Sms size={22} color={appColors.green2} />}
          allowClear
          keyboardType={'email-address'}
          onEndEditing={() => validateForm('email')}
        />


        {/* validate */}
        <TextComponent text={errorMessProfile.messPassword} color={appColors.danger} style={{ marginVertical: 5 }} />
        <InputComponent
          value={profile?.password}
          placeholder="Password"
          onChangeText={preText => handleChangeValue('password', preText)}
          affix={<Lock size={22} color={appColors.green2} />}
          allowClear
          isPassword
          onEndEditing={() => validateForm('password')}
        />
        {/* validate */}
        <TextComponent text={errorMessProfile.messConfirmPassword} color={appColors.danger} style={{ marginVertical: 5 }} />
        <InputComponent
          value={profile?.confirmPassword}
          placeholder="Confirm password"
          onChangeText={preText => handleChangeValue('confirmPassword', preText)}
          affix={<Lock size={22} color={appColors.green2} />}
          allowClear
          isPassword
          onEndEditing={() => validateForm('confirmPassword')}
        />

      </SectionComponent>



      {errorMess &&
        <SectionComponent>
          <TextComponent text={errorMess} color={appColors.danger} />
        </SectionComponent>
      }
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent text='SIGN UP' type='primary' onPress={handleRegister} disable={!isFormValid} />
      </SectionComponent>

      <SocialLogin />

      <SectionComponent>
        <RowComponent style={{ justifyContent: 'center' }}>
          <TextComponent text={"Don't have an account? "} />
          <ButtonComponent text='Sign in' type='link' onPress={() => navigation.navigate('LoginScreen')} />
        </RowComponent>
      </SectionComponent>

      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  )
}

export default SignUpScreen