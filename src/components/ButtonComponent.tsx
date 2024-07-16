import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import TextComponent from './TextComponent';
import { globalStyle } from '../styles/globalStyle';
import { appColors } from '../constants/appColors';
import { appFonts } from '../constants/appFonts';

interface Props {
    icon?: React.ReactNode;
    text: string;
    color?: string;
    backgroundColor?: string;
    style?: StyleProp<ViewStyle>;
    iconFlex?: 'right' | 'left';
    type?: 'primary' | 'link';
    onPress?: () => void;
    textStyle?: StyleProp<ViewStyle>;
    fontFamily?: string;
}

const ButtonComponent = (props: Props) => {
    const { icon, text, color, backgroundColor, style, iconFlex = 'left', type = 'primary', onPress, textStyle, fontFamily } = props;

    return type === 'primary' ? (
        <TouchableOpacity
            style={[
                globalStyle.button,
                {
                    backgroundColor: backgroundColor ?? appColors.primary,
                },
                globalStyle.shadow,
                style,
            ]}
            onPress={onPress}
        >
            {icon && icon}
            <TextComponent
                text={text}
                style={[
                    textStyle,
                    {
                        marginLeft: icon ? 12 : 0,
                        fontSize: 16,
                    },
                ]}
                color={color ?? appColors.white}
                fontFamily={fontFamily ?? appFonts.airBnBMedium}
                flex={icon && iconFlex === 'right' ? 1 : 0}
            />
            {icon && iconFlex === 'right' && icon}
        </TouchableOpacity>
    ) : (
        <TouchableOpacity onPress={onPress}>
            <TextComponent
                text={text}
                color={type === 'link' ? appColors.link : appColors.text} //hoac là type = text
            />
        </TouchableOpacity>
    );
};

export default ButtonComponent;
