import { View, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyle } from '../styles/globalStyle'

interface Props {
    style?: StyleProp<ViewStyle>
    children: ReactNode,
    onPress?: () => void
}
const RowComponent = (props: Props) => {
    const { style, children, onPress } = props
    return (
        onPress ? (
            <TouchableOpacity onPress={onPress} style={[globalStyle.row, {}, style]} activeOpacity={0.5}>
                {children}
            </TouchableOpacity>
        ) : (
            <View style={[globalStyle.row, {}, style]} >
                {children}
            </View>
        )
    )
}

export default RowComponent