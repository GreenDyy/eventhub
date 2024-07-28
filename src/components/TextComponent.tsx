import React from 'react';
import { Text, StyleProp, TextStyle, Platform } from 'react-native';
import { appColors } from '../constants/appColors';
import { globalStyle } from '../styles/globalStyle';
import { appFonts } from '../constants/appFonts';

interface Props {
    text: string;
    color?: string;
    fontSize?: number;
    flex?: number;
    fontFamily?: string;
    style?: StyleProp<TextStyle>;
    isTitle?: boolean;
}

const TextComponent = (props: Props) => {
    const {
        text,
        color,
        fontSize,
        flex,
        fontFamily,
        style,
        isTitle = false,
    } = props;

        const fontSizeDefault = Platform.OS === 'ios' ? 16 : 14
    return (
        <Text
            style={[
                globalStyle.text,
                {
                    color: color ?? appColors.text,
                    flex: flex ?? 0,
                    fontSize: fontSize ?? (isTitle ? 24 : fontSizeDefault),
                    fontFamily: fontFamily ?? (isTitle ? appFonts.airBnBSemiBold : appFonts.airBnBRegular),
                },
                style,
            ]}
        >
            {text}
        </Text>
    );
};

export default TextComponent;
