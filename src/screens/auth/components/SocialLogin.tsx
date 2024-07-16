import { View, Text } from 'react-native'
import React from 'react'
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'
import { appFonts } from '../../../constants/appFonts'
import { Facebook, Google } from 'iconsax-react-native'

interface Props {

}

const SocialLogin = (props: Props) => {
    return (
        <SectionComponent>
            <TextComponent
                text='OR' color={appColors.gray}
                fontSize={16} style={{ textAlign: 'center' }}
                fontFamily={appFonts.airBnBMedium} />

            <SpaceComponent height={10} />

            <ButtonComponent
                type='primary'
                text='Login with Google'
                color={appColors.text}
                icon={<Google size={24} color={appColors.primary} />}
                backgroundColor={appColors.white}
                fontFamily={appFonts.airBnBRegular}
                iconFlex='left'
            />
            <SpaceComponent height={10} />

            <ButtonComponent
                type='primary'
                text='Login with Facebook'
                color={appColors.text}
                icon={<Facebook size={24} color={appColors.primary} />}
                backgroundColor={appColors.white}
                fontFamily={appFonts.airBnBRegular}
                iconFlex='left'
            />
        </SectionComponent>
    )
}

export default SocialLogin