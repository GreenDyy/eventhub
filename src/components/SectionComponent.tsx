import { View, Text, ViewStyle, StyleProp } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyle } from '../styles/globalStyle'

interface Props {
    style?: StyleProp<ViewStyle>
    children: ReactNode,
}
const SectionComponent = (props: Props) => {
    const { children, style } = props
    return (
        <View style={[globalStyle.section, {}, style]}>
            {children}
        </View>
    )
}

export default SectionComponent