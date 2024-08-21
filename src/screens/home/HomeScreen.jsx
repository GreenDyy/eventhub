import { HambergerMenu, Notification, SearchNormal1, Sort } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, ImageBackground, Platform, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonComponent, CardComponent, CategoriesListComponent, CircleComponent, EventItemComponent, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { appFonts } from '../../constants/appFonts'
import { authSelector } from '../../srcRedux/reducers/authReducer'
import { globalStyle } from '../../styles/globalStyle'
import { images } from '../../constants/images'
import Geolocation from '@react-native-community/geolocation'
import axios from 'axios'
import AddressModel from '../../models/AddressModel'
import Geocoder from 'react-native-geocoding'
import { appInfors } from '../../constants/appInfors'

const eventData = [
  {
    title: 'Contept Sơn Tùng MTP',
    description: 'Buổi hoà nhạc to nhất TP.HCM năm 2024 hứa hẹn sẽ là sự kiện âm nhạc lớn nhất và hoành tráng nhất mà thành phố từng chứng kiến. Với sự góp mặt của hàng loạt nghệ sĩ nổi tiếng cả trong nước và quốc tế, chương trình sẽ mang đến cho khán giả những trải nghiệm âm nhạc đỉnh cao, từ nhạc pop, rock, đến EDM và hơn thế nữa. ',
    location: {
      title: 'HUIT Đại học Công Thương TP.HCM',
      address: '28 Lê Trọng Tấn'
    },
    imageUrl: '',
    user: [],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),

  },
  {
    title: 'Contept SooBin',
    description: 'Buổi hoà nhạc to nhất TP.HCM năm 2024 hứa hẹn sẽ là sự kiện âm nhạc lớn nhất và hoành tráng nhất mà thành phố từng chứng kiến. Với sự góp mặt của hàng loạt nghệ sĩ nổi tiếng cả trong nước và quốc tế, chương trình sẽ mang đến cho khán giả những trải nghiệm âm nhạc đỉnh cao, từ nhạc pop, rock, đến EDM và hơn thế nữa.',
    location: {
      title: 'HUIT Đại học Công Thương TP.HCM',
      address: '28 Lê Trọng Tấn'
    },
    imageUrl: '',
    user: [],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),

  },
  {
    title: 'Contept Sơn Tùng MTP',
    description: 'Buổi hoà nhạc to nhất TP.HCM năm 2024 hứa hẹn sẽ là sự kiện âm nhạc lớn nhất và hoành tráng nhất mà thành phố từng chứng kiến. Với sự góp mặt của hàng loạt nghệ sĩ nổi tiếng cả trong nước và quốc tế, chương trình sẽ mang đến cho khán giả những trải nghiệm âm nhạc đỉnh cao, từ nhạc pop, rock, đến EDM và hơn thế nữa.',
    location: {
      title: 'HUIT Đại học Công Thương TP.HCM',
      address: '28 Lê Trọng Tấn'
    },
    imageUrl: '',
    user: [],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),

  },
]

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const auth = useSelector(authSelector)
  const [myLocation, setMyLocation] = useState()

  useEffect(() => {
    Geolocation.getCurrentPosition((position) => {
      if (position.coords) {
        reverseGeoCode(position.coords.latitude, position.coords.longitude)
      }
    })
  }, []);

  const reverseGeoCode = async (lat, long) => {
    //lấy từ app eventhub bên here
    const apiKey = 'dMtcjREnppyVY6bFJEA-J5SZzMxEzbnj18LNlWwsYzA'
    const api = `https://geocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&apiKey=${apiKey}`
    try {
      const res = await axios.get(api)
      const curLocation = res.data.items[0]
      console.log(curLocation)
      setMyLocation(curLocation)
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={[globalStyle.container]}>
      <StatusBar barStyle={'light-content'} />
      <View style={{
        backgroundColor: appColors.primary,
        height: Platform.OS === 'android' ? 168 : 180,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,

      }}>
        <View style={{ paddingHorizontal: 16 }}>
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>
            <View style={[{ flex: 1, alignItems: 'center' }]}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColors.white2}
                  size={12}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                />
              </RowComponent>
              {
                myLocation && (
                  <TextComponent
                    text={`${myLocation.address.city}, ${myLocation.address.county}`}
                    flex={0}
                    color={appColors.white}
                    font={appFonts.airBnBMedium}
                    size={13}
                  />)
              }
            </View>

            <CircleComponent
              color="#524CE0"
              size={36}
              onPress={() => { Alert.alert('Thông báo here') }}>
              <View>
                <Notification size={18} color={appColors.white} />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 10,
                    height: 10,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#524CE0',
                    position: 'absolute',
                    top: -2,
                    right: -2,
                  }}
                />
              </View>
            </CircleComponent>
          </RowComponent>

          <SpaceComponent height={24} />

          {/* thanh search */}
          <RowComponent>
            <RowComponent
              style={{ flex: 1 }}
              onPress={() =>
                navigation.navigate('SearchEvent', {
                  isFilter: false,
                })
              }
            >
              <SearchNormal1
                variant="TwoTone"
                size={22}
                color={appColors.white}
              />
              <View
                style={{
                  width: 1,
                  height: 18,
                  marginHorizontal: 12,
                  backgroundColor: '#A29EF0',
                }}
              />
              <TextComponent text="Search..." color={`#A29EF0`} />
            </RowComponent>

            {/* nút fillter */}
            <RowComponent
              onPress={() =>
                navigation.navigate('SearchEvent', {
                  isFilter: true,
                })
              }
              style={{
                backgroundColor: '#5D56F3',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 100,
              }}>
              <CircleComponent size={19.3} color={`#A29EF0`}>
                <Sort size={12} color={appColors.primary} />
              </CircleComponent>
              <SpaceComponent width={8} />
              <TextComponent text="Filters" color={appColors.white} />
            </RowComponent>

          </RowComponent>
        </View>

        <SpaceComponent height={20} />

        <View style={{ marginBottom: -16 }}>
          <CategoriesListComponent isColor />
        </View>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: Platform.OS === 'android' ? 18 : 22 }}
      >
        {/* section sự kiện */}
        <SectionComponent style={{ paddingTop: 20, paddingHorizontal: 0, }}>
          <TabBarComponent title='Upcoming Events' onPress={() => { }} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={eventData}
            renderItem={({ item, index }) => {
              return (
                <EventItemComponent key={index} item={item} type='card' />
              )
            }}
          />
          <SpaceComponent height={12} />

          <CardComponent bgColor='#D3FEFE' styles={{ minHeight: 127, padding: 0 }}>
            <ImageBackground source={images.invite}
              style={{ flex: 1, overflow: 'hidden' }}
              imageStyle={{ resizeMode: 'cover', height: 147, right: -25 }}>
              <View style={{ padding: 12 }}>
                <TextComponent text='Invite your friends' isTitle fontSize={18} />
                <SpaceComponent height={8} />
                <TextComponent text='Get $20 for ticket' />
                <SpaceComponent height={12} />
                <View style={{ borderRadius: 8, backgroundColor: '#00F8FD', width: 72, height: 32, justifyContent: 'center', alignItems: 'center' }}>
                  <TextComponent text='INVITE' color={appColors.white} />
                </View>
              </View>
            </ImageBackground>
          </CardComponent>
          {/* nearby you */}
          <TabBarComponent title='Nearby You' onPress={() => { }} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={eventData}
            renderItem={({ item, index }) => {
              return (
                <EventItemComponent key={index} item={item} type='card' />
              )
            }}
          />

        </SectionComponent>

      </ScrollView>
    </View>
  )
}

export default HomeScreen