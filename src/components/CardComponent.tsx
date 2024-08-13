import React, { ReactNode } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { appColors } from '../constants/appColors';
import { globalStyle } from '../styles/globalStyle';

interface Props {
  children: ReactNode;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void
}

const CardComponent = (props: Props) => {
  const { children, bgColor, styles, onPress } = props;
  return (
    <TouchableOpacity
      style={[
        globalStyle.card,
        {
          backgroundColor: bgColor ?? appColors.white,
        },
        styles,
      ]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default CardComponent;