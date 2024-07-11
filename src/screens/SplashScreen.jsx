import { ActivityIndicator, ImageBackground, Image } from 'react-native'
import React from 'react'
import { images } from '../constants/images'
import { appInfors } from '../constants/appInfors'
import { SpaceComponent } from '../components'
import { appColors } from '../constants/appColors'

const SplashScreen = () => {
  return (
    <ImageBackground
      source={images.bg}
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{ flex: 1 }}
    >

      <Image
        source={images.logo}
        style={{
          width: appInfors.sizes.WIDTH * 0.7,
          resizeMode: 'contain'
        }}

      />
      
      <SpaceComponent height={30} />

      <ActivityIndicator  color={appColors.green1} />

    </ImageBackground>
  )
}

export default SplashScreen