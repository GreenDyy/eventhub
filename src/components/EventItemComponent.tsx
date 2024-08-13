import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import CardComponent from './CardComponent'
import { appInfors } from '../constants/appInfors'
import TextComponent from './TextComponent'
import { Event } from '../models/EventModel'
import AvatarGroup from './AvatarGroup'
import RowComponent from './RowComponent'
import { Location, Save2 } from 'iconsax-react-native'
import { appColors } from '../constants/appColors'
import SpaceComponent from './SpaceComponent'
import { globalStyle } from '../styles/globalStyle'
import { appFonts } from '../constants/appFonts'
import { useNavigation } from '@react-navigation/native'


interface Props {
  item: Event
  type?: 'gird' | 'list'
}
const EventItemComponent = (props: Props) => {
  const { item, type } = props
  const navigation: any = useNavigation()
  return (
    <CardComponent
      styles={[globalStyle.shadow, { width: appInfors.sizes.WIDTH * 0.7 }]}
      onPress={() => { navigation.navigate('EventDetailScreen', { item }) }}
    >
      <ImageBackground source={require('../assets/images/event-image.png')}
        style={{
          flex: 1,
          marginBottom: 12,
          height: 131,
          padding: 10

        }}
        imageStyle={{
          borderRadius: 12,
          resizeMode: 'cover'
        }}
      >
        <RowComponent style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <CardComponent
            styles={{ justifyContent: 'center', alignItems: 'center', height: 45, width: 45, padding: 0, margin: 0 }}
            bgColor='rgba(255, 255, 255, 0.8)'>
            <TextComponent text='10' fontSize={18} color={appColors.danger2} fontFamily={appFonts.airBnBMedium} />
            <TextComponent text='JUNE' fontSize={10} color={appColors.danger2} fontFamily={appFonts.airBnBRegular} />
          </CardComponent>

          <CardComponent
            styles={{ justifyContent: 'center', alignItems: 'center', height: 30, width: 30, padding: 0, margin: 0, borderRadius: 7 }}
            bgColor='rgba(255, 255, 255, 0.8)'>
            <Save2 size={14} color={appColors.danger2} variant='Bold' />
          </CardComponent>
        </RowComponent>

      </ImageBackground>
      <TextComponent text={item?.title} isTitle fontSize={18} numberOfLines={1} />
      <AvatarGroup />
      <RowComponent>
        <Location size={18} color={appColors.text3} variant='Bold' />
        <SpaceComponent width={5} />
        <TextComponent text={item?.location.address} color={appColors.text3} flex={1} />
      </RowComponent>
    </CardComponent>
  )
}

export default EventItemComponent