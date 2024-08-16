import { View, Text, ImageBackground, ScrollView, StatusBar, Platform, Image } from 'react-native'
import React from 'react'
import { AvatarGroup, ButtonComponent, CardComponent, CircleComponent, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { images } from '../../constants/images'
import { ArrowLeft, ArrowLeft2, ArrowRight, Calendar, Save2 } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { appFonts } from '../../constants/appFonts'
import { appInfors } from '../../constants/appInfors'
import LinearGradient from 'react-native-linear-gradient'
import { globalStyle } from '../../styles/globalStyle'

const EventDetailScreen = ({ navigation, route }) => {
  const { item } = route.params
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={images.eventdetail}
        style={{ height: 221, }}
        resizeMode='cover'>

        {/* header bar */}
        {/* <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0)']}> */}
        <RowComponent style={{
          marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 42,
          padding: 16,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flex: 1
        }}>

          <RowComponent>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginRight: 12 }}>
              <ArrowLeft size={24} color={appColors.white} variant='Outline' />
            </TouchableOpacity>
            <TextComponent text='Event Details' isTitle color={appColors.white} fontSize={24} fontFamily={appFonts.airBnBMedium} />
          </RowComponent>

          <CardComponent
            styles={{ justifyContent: 'center', alignItems: 'center', height: 36, width: 36, padding: 0, margin: 0, borderRadius: 12 }}
            bgColor='rgba(255, 255, 255, 0.5)'>
            <Save2 size={18} color={appColors.white} variant='Bold' />
          </CardComponent>

        </RowComponent>

        {/* </LinearGradient> */}

        <RowComponent style={[
          globalStyle.shadow,
          {
            backgroundColor: appColors.white2,
            width: 295,
            minHeight: 60,
            alignSelf: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: -25,
            zIndex: 10,
            borderRadius: 50,
            paddingHorizontal: 14,
          }
        ]}>
          <AvatarGroup size={34} fontSize={15} />
          <TouchableOpacity style={{ borderRadius: 7, backgroundColor: appColors.primary, width: 67, height: 28, justifyContent: 'center', alignItems: 'center' }}>
            <TextComponent text='Invite' color={appColors.white} fontSize={12} />
          </TouchableOpacity>
        </RowComponent>


      </ImageBackground>

      {/* nội dung here */}

      <ScrollView style={{
        paddingTop: 25,
        backgroundColor: appColors.white
      }}
        showsVerticalScrollIndicator={false}
      >
        <SpaceComponent height={10} />
        <SectionComponent>
          <TextComponent text={item?.title} fontSize={34} fontFamily={appFonts.airBnBMedium} />
        </SectionComponent>
        {/* lịch */}
        <SectionComponent>
          <RowComponent>
            <CardComponent
              styles={{ justifyContent: 'center', alignItems: 'center', height: 48, width: 48, padding: 0, margin: 0, borderRadius: 12 }}
              bgColor={appColors.bg_primary}>
              <Calendar size={30} color={appColors.primary} variant='Bold' />
            </CardComponent>
            <SpaceComponent width={10} />
            <View style={{ height: 50, justifyContent: 'space-between' }}>
              <TextComponent text='14 December, 2021' fontSize={16} fontFamily={appFonts.airBnBMedium} />
              <TextComponent text='Tuesday, 4:00PM - 9:00PM' fontSize={12} color={appColors.gray} />
            </View>
          </RowComponent>
        </SectionComponent>

        {/* location */}
        <SectionComponent>
          <RowComponent>
            <CardComponent
              styles={{ justifyContent: 'center', alignItems: 'center', height: 48, width: 48, padding: 0, margin: 0, borderRadius: 12 }}
              bgColor={appColors.bg_primary}>
              <Calendar size={30} color={appColors.primary} variant='Bold' />
            </CardComponent>
            <SpaceComponent width={10} />
            <View style={{ height: 50, justifyContent: 'space-between' }}>
              <TextComponent text='14 December, 2021' fontSize={16} fontFamily={appFonts.airBnBMedium} />
              <TextComponent text='Tuesday, 4:00PM - 9:00PM' fontSize={12} color={appColors.gray} />
            </View>
          </RowComponent>
        </SectionComponent>

        {/* Người tổ chức */}
        <SectionComponent>
          <RowComponent style={{ justifyContent: 'space-between' }}>
            <RowComponent>
              <Image source={{ uri: 'https://i.pinimg.com/736x/28/dc/36/28dc36d443030e5222e4b39118f18d4e.jpg' }}
                style={{ height: 48, width: 48, borderRadius: 12 }} />
              <SpaceComponent width={10} />
              <View style={{ height: 50, justifyContent: 'space-between' }}>
                <TextComponent text='Duy đẹp trai' fontSize={16} fontFamily={appFonts.airBnBMedium} />
                <TextComponent text='Organizer' fontSize={12} color={appColors.gray} />
              </View>
            </RowComponent>

            <TouchableOpacity style={{ borderRadius: 7, backgroundColor: appColors.bg_primary, width: 67, height: 28, justifyContent: 'center', alignItems: 'center' }}>
              <TextComponent text='Invite' color={appColors.link} fontSize={12} />
            </TouchableOpacity>

          </RowComponent>
        </SectionComponent>

        {/* mô tả */}
        <SectionComponent tionComponent>
          <TextComponent text='About Event' fontSize={18} fontFamily={appFonts.airBnBMedium} />
          <TextComponent text={item?.description} />
        </SectionComponent>
      </ScrollView>

      {/* vùng mờ */}
      <LinearGradient colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,1)']}
        style={{
          height: 40,
          width: appInfors.sizes.WIDTH,
          position: 'absolute',
          bottom: 0
        }}/>
      {/* float button */}

      {/* <ButtonComponent
        text='BUY TICKET $120'
        icon={
          <CircleComponent color={appColors.primary2} size={30}>
            <ArrowRight size={16} color={appColors.white} />
          </CircleComponent>
        }
        iconFlex='right'
        style={{ position: 'absolute', bottom: -50 }} /> */}
    </View>
  )
}

export default EventDetailScreen