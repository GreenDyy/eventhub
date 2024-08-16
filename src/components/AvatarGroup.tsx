import { View, Text, Image } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { appColors } from '../constants/appColors'
import { appFonts } from '../constants/appFonts'
import SpaceComponent from './SpaceComponent'
import CircleComponent from './CircleComponent'

interface Props {
  size?: number
  fontSize?: number
}

const AvatarGroup = (props: Props) => {
  const { size, fontSize } = props
  const testPhotoUrl = 'https://i.pinimg.com/564x/6e/b0/65/6eb065a62e41f41af0155e028402c4d1.jpg'
  return (
    <RowComponent style={{ marginVertical: 12 }}>
      {Array.from({ length: 3 }).map((item, index) => (
        <CircleComponent key={index} size={size ? (size + 2) : 22} color={appColors.white} styles={{ zIndex: 10 - index, marginLeft: index > 0 ? -8 : 0 }}>
          <Image source={{ uri: testPhotoUrl }}
            style={{ width: size ?? 22, height: size ?? 22, borderRadius: 999 }} />
        </CircleComponent>
      ))}
      <SpaceComponent width={10} />
      <TextComponent text='+20 Going' fontSize={fontSize ?? 12} color={appColors.primary} fontFamily={appFonts.airBnBMedium} />
    </RowComponent>
  )
}

export default AvatarGroup