import { View, Text, Image } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { appColors } from '../constants/appColors'
import { appFonts } from '../constants/appFonts'
import SpaceComponent from './SpaceComponent'
import CircleComponent from './CircleComponent'


const AvatarGroup = () => {
  const testPhotoUrl = 'https://i.pinimg.com/564x/6e/b0/65/6eb065a62e41f41af0155e028402c4d1.jpg'
  return (
    <RowComponent style={{ marginVertical: 12 }}>
      {Array.from({ length: 3 }).map((item, index) => (
        <CircleComponent size={24} color={appColors.white} styles={{ zIndex: 10 - index, marginLeft: index > 0 ? -8 : 0 }}>
          <Image source={{ uri: testPhotoUrl }}
            style={{ width: 22, height: 22, borderRadius: 999 }} />
        </CircleComponent>
      ))}
      <SpaceComponent width={10} />
      <TextComponent text='+20 Going' fontSize={12} color={appColors.primary} fontFamily={appFonts.airBnBMedium} />
    </RowComponent>
  )
}

export default AvatarGroup