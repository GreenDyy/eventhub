import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../../styles/globalStyle'
import Swiper from 'react-native-swiper'
import { images } from '../../constants/images'
import { appInfors } from '../../constants/appInfors'
import { appColors } from '../../constants/appColors'
import { TextComponent } from '../../components'

const OnBoardingScreen = ({ navigation }) => {
  const [curIndex, setCurIndex] = useState(0)

  const handleNextStep = () => {
    if (curIndex < 2) {
      setCurIndex(curIndex + 1)
    }
    else {
      navigation.navigate('LoginScreen')
    }
  }
  return (
    <View style={[globalStyle.container]}>

      <Swiper
        dotColor='#7497F9'
        loop={false}
        index={curIndex}
        // onIndexChanged={e => setCurIndex(e)}
        activeDotColor='white'
      >
        <Image source={images.onboarding1}
          style={{
            flex: 1,
            width: appInfors.sizes.WIDTH,
            height: appInfors.sizes.HEIGHT,
            resizeMode: 'cover'
          }}
        />

        <Image source={images.onboarding2}
          style={{
            flex: 1,
            width: appInfors.sizes.WIDTH,
            height: appInfors.sizes.HEIGHT,
            resizeMode: 'cover'
          }}
        />

        <Image source={images.onboarding3}
          style={{
            flex: 1,
            width: appInfors.sizes.WIDTH,
            height: appInfors.sizes.HEIGHT,
            resizeMode: 'cover'
          }}
        />
      </Swiper>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center'
      }}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <TextComponent text='Skip' color={appColors.gray2} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNextStep}>
          <TextComponent text='Next' color={appColors.white} />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
  textBtn: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: 500
  }
})