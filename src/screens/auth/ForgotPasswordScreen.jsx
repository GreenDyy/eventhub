import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { ArrowRight, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')
  return (
    <ContainerComponent title='Quên' back isScroll={true} >
      <SectionComponent>
        <TextComponent text='Reset Password' isTitle />
        <TextComponent text='Please enter your email address to request a password reset' />
        <SpaceComponent height={26} />
        <InputComponent value={email}
          onChangeText={preText => setEmail(preText)}
          affix={<Sms size={20} color={appColors.gray} />}
          placeholder='abc@gmail.com' />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent
          text='Send'
          type='primary'
          icon={<ArrowRight size={20}
            color={appColors.white} />}
          iconFlex='right' />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default ForgotPasswordScreen