import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { ArrowRight, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import authenticationAPI from '../../apis/authApis'
import { LoadingModal } from '../../modals'
import { Validate } from '../../utils/validate'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)

  const handleCheckEmail = () => {
    setIsValidEmail(Validate.Email(email));
  }

  const handleForgotPassword = async () => {
    setIsLoading(true)
    try {
      const api = '/forgotPassword'
      const res = await authenticationAPI.handleAuthentication(api, { email }, 'post')
      Alert.alert('Quên mật khẩu', 'Chúng tôi vừa gửi lại cho bạn một mật khẩu mới qua email')
      console.log(res)
      setIsLoading(false)
    }
    catch (e) {
      Alert.alert('Quên mật khẩu', 'Có lỗi xảy ra')
      setIsLoading(false)
    }
  }

  return (
    <ContainerComponent title='Quên' back isScroll={true} >
      <SectionComponent>
        <TextComponent text='Reset Password' isTitle />
        <TextComponent text='Please enter your email address to request a password reset' />
        <SpaceComponent height={26} />
        <InputComponent value={email}
          onChangeText={preText => setEmail(preText)}
          affix={<Sms size={20} color={appColors.gray} />}
          placeholder='abc@gmail.com'
          onEndEditing={handleCheckEmail} />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent
          text='Send'
          type='primary'
          icon={<ArrowRight size={20}
            color={appColors.white} />}
          iconFlex='right'
          disable={!isValidEmail}
          onPress={handleForgotPassword} />
      </SectionComponent>

      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  )
}

export default ForgotPasswordScreen