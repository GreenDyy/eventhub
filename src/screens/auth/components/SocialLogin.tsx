import React from 'react'
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'
import { appFonts } from '../../../constants/appFonts'
import { Facebook, Google } from '../../../assets/svgs'
// import { Facebook, Google } from 'iconsax-react-native'

interface Props {

}

const SocialLogin = (props: Props) => {
    return (
        <SectionComponent>
            <TextComponent
                text='OR' color={appColors.gray}
                fontSize={16} style={{ textAlign: 'center' }}
                fontFamily={appFonts.airBnBMedium} />

            <SpaceComponent height={16} />

            <ButtonComponent
                type='primary'
                text='Login with Google'
                color={appColors.text}
                icon={<Google />}
                backgroundColor={appColors.white}
                fontFamily={appFonts.airBnBRegular}
                iconFlex='left'
            />

            <ButtonComponent
                type='primary'
                text='Login with Facebook'
                color={appColors.text}
                icon={<Facebook />}
                backgroundColor={appColors.white}
                fontFamily={appFonts.airBnBRegular}
                iconFlex='left'
            />
        </SectionComponent>
    )
}

export default SocialLogin