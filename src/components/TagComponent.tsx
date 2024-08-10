import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import TextComponent from './TextComponent'
import { globalStyle } from '../styles/globalStyle'
import { appColors } from '../constants/appColors'

interface Props {
    onPress?: () => void
    text: string,
    icon?: ReactNode
    backgroundColor?: string
    textColor?: string
    style?: StyleProp<ViewStyle>

}
const TagComponent = (props: Props) => {
    const { onPress, text, icon, backgroundColor, textColor, style } = props
    return (
        <TouchableOpacity style={[
            globalStyle.row,
            globalStyle.tag,
            {
                backgroundColor: backgroundColor ?? appColors.white,
            }, 
            style]}
            onPress={onPress}>
            {icon && icon}
            <TextComponent
                text={text}
                color={textColor ? textColor : backgroundColor ? appColors.white : appColors.gray}
                style={{ marginLeft: icon ? 8 : 0 }} />
        </TouchableOpacity>
    )
}

export default TagComponent