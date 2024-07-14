import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { CloseCircle, EyeSlash } from 'iconsax-react-native'
import { appColors } from '../constants/appColors'
import { globalStyle } from '../styles/globalStyle'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'

const InputComponent = ({ value, onChangeText, affix, suffix, placeholder, isPassword, allowClear, keyboardType }) => {
  // const { value, onChangeText, affix, suffix, placeholder, isPassword, allowClear, keyboardType } = props
  const [isShowPass, setIsShowPass] = useState(false)

  const handlePress = () => {
    if (isPassword) {
      setIsShowPass(!isShowPass);
    } else {
      onChangeText('');
    }
  };
  return (
    <View style={[styles.inputContainer]}>
      {affix ?? affix}
      <TextInput style={[globalStyle.text, styles.input]}
        value={value}
        onChangeText={val => onChangeText(val)}
        placeholder={placeholder || ''}
        secureTextEntry={isPassword && !isShowPass}
        placeholderTextColor={appColors.gray}
        keyboardType={keyboardType ?? 'default'}
      />
      {suffix ?? suffix}

      <TouchableOpacity onPress={handlePress}>
        {isPassword ? (
          <FontAwesome name={isShowPass ? 'eye-slash' : 'eye'} size={22} color={appColors.gray} />
        ) : (
          value !== '' && allowClear && <AntDesign name='close' size={22} color={appColors.gray} />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default InputComponent

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray2,
    width: '100%',
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: appColors.white,
    marginBottom: 20
  },

  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 14,
    color: appColors.gray,
  }
})