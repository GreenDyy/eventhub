import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent'
import { globalStyle } from '../styles/globalStyle'
import { appColors } from '../constants/appColors'
import { appFonts } from '../constants/appFonts'

const ButtonComponent = (props) => {
    const { icon, text, color, backgroundColor, style, iconFlex, type='primary', onPress, textStyle } = props
    return type === 'primary' ? (
        <TouchableOpacity style={[globalStyle.button,
        {
            backgroundColor: backgroundColor ?? appColors.primary
        },
            style
        ]}
            onPress={onPress}
        >
            {icon && icon}
            <TextComponent
                text={text}
                style={[textStyle, {
                    marginleft: icon ? 12 : 0,
                }]}
                color={color ?? appColors.white}
                fontFamily={appFonts.airBnBMedium}
                flex={icon && iconFlex === 'right' ? 1 : 0}
            />
            {icon && iconFlex === 'right' && icon}
        </TouchableOpacity>
    ) : (
        <TouchableOpacity>
            <TextComponent
                text={text}
                color={type === 'link' ? appColors.link: appColors.text}
            />
        </TouchableOpacity>
    )
}

export default ButtonComponent