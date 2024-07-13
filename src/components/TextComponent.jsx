import { Text } from 'react-native'
import React from 'react'
import { appColors } from '../constants/appColors'
import { globalStyle } from '../styles/globalStyle'
import { appFonts } from '../constants/appFonts'

const TextComponent = (props) => {
    const { text, color, fontSize, flex, fontFamily, style, isTitle } = props
    return (
        <Text style={[globalStyle.text, {
            color: color ?? appColors.text,
            flex: flex ?? 0,
            fontSize: fontSize ?? isTitle ? 24 : 14,
            fontFamily: fontFamily ?? isTitle ? appFonts.airBnBSemiBold : appFonts.airBnBMedium
        },
            style
        ]}>{text}</Text>
    )
}

export default TextComponent