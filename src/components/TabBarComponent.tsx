import { View, Text } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { appColors } from '../constants/appColors'
import { ArrowRight2 } from 'iconsax-react-native'

interface Props {
  title: string
  onPress: () => {}
}

const TabBarComponent = (props: Props) => {
  const { title, onPress } = props
  return (
    <RowComponent style={{justifyContent:'space-between',  paddingHorizontal: 16, }}>
      <TextComponent isTitle text={title} fontSize={18} />
      <RowComponent onPress={onPress}>
        <TextComponent text='See All' fontSize={12} color={appColors.gray}/>
        <ArrowRight2 size={14} color={appColors.gray} variant='Bold'/>
      </RowComponent>
    </RowComponent>
  )
}

export default TabBarComponent