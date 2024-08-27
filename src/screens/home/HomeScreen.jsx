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
    title: 'Concert Sơn Tùng MTP',
    description: 'Buổi hòa nhạc to nhất TP.HCM năm 2024 hứa hẹn sẽ là sự kiện âm nhạc lớn nhất và hoành tráng nhất mà thành phố từng chứng kiến. Với sự góp mặt của hàng loạt nghệ sĩ nổi tiếng cả trong nước và quốc tế, chương trình sẽ mang đến cho khán giả những trải nghiệm âm nhạc đỉnh cao, từ nhạc pop, rock, đến EDM và hơn thế nữa. Buổi hòa nhạc này không chỉ là một sự kiện giải trí mà còn là nơi kết nối tình yêu âm nhạc của hàng nghìn người hâm mộ. Tất cả mọi người sẽ cùng nhau hát vang, nhảy múa và thưởng thức những bản hit đình đám nhất của Sơn Tùng MTP. Đây sẽ là một đêm khó quên đối với tất cả những ai tham dự.',
    location: {
      title: 'HUIT Đại học Công Thương TP.HCM',
      address: '28 Lê Trọng Tấn'
    },
    imageUrl: 'https://img.freepik.com/free-vector/music-frequency-edm-background-design_1017-33904.jpg',
    user: [],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
  },
  {
    title: 'Lễ hội Âm nhạc Quốc tế',
    description: 'Lễ hội âm nhạc quốc tế tại TP.HCM năm 2024 sẽ là một sự kiện đáng mong đợi nhất trong năm với sự góp mặt của những nghệ sĩ hàng đầu từ nhiều quốc gia khác nhau. Sự kiện sẽ diễn ra trong suốt 3 ngày liền với những màn trình diễn đỉnh cao từ nhiều thể loại âm nhạc như pop, rock, hip-hop, EDM, và nhạc cổ điển. Khán giả sẽ được trải nghiệm một không gian âm nhạc đa dạng, từ những sân khấu ngoài trời đầy sôi động đến những buổi hòa nhạc trong nhà đầy cảm xúc. Đây không chỉ là một lễ hội âm nhạc mà còn là dịp để giao lưu, kết nối với những người bạn cùng sở thích âm nhạc từ khắp nơi trên thế giới.',
    location: {
      title: 'Sân vận động Phú Thọ',
      address: 'Số 1 Lữ Gia, Quận 11'
    },
    imageUrl: 'https://images7.alphacoders.com/133/1339451.png',
    user: [],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
  },
  {
    title: 'Giao lưu âm nhạc với Hà Anh Tuấn',
    description: 'Chương trình giao lưu âm nhạc với Hà Anh Tuấn sẽ mang đến cho khán giả những phút giây lắng đọng với những bản tình ca ngọt ngào và sâu lắng. Đêm nhạc không chỉ là nơi để thưởng thức những ca khúc nổi tiếng của Hà Anh Tuấn mà còn là dịp để khán giả có thể chia sẻ những cảm xúc, câu chuyện của mình với nam ca sĩ. Với không gian âm nhạc ấm cúng và gần gũi, đêm nhạc hứa hẹn sẽ mang đến những trải nghiệm khó quên cho khán giả. Đây sẽ là một cơ hội tuyệt vời để khán giả và nghệ sĩ có thể gắn kết, thấu hiểu và đồng cảm với nhau qua những giai điệu thân quen.',
    location: {
      title: 'Nhà hát Hòa Bình',
      address: '240 Đường 3 Tháng 2, Quận 10'
    },
    imageUrl: 'https://img.freepik.com/free-vector/music-party-background-neon-style_1017-32948.jpg',
    user: [],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
  },
  {
    title: 'Đêm nhạc Hoàng Thùy Linh',
    description: 'Đêm nhạc Hoàng Thùy Linh tại TP.HCM năm 2024 hứa hẹn sẽ là một sự kiện âm nhạc hoành tráng với những màn trình diễn sôi động và bùng nổ. Khán giả sẽ được thưởng thức những bản hit đình đám của nữ ca sĩ, từ những ca khúc pop hiện đại đến những bài hát mang đậm âm hưởng dân gian đương đại. Với sự đầu tư kỹ lưỡng về sân khấu, ánh sáng, và trang phục, đêm nhạc sẽ mang đến một trải nghiệm âm nhạc đa chiều, nơi nghệ thuật trình diễn và âm nhạc hòa quyện với nhau tạo nên những phút giây thăng hoa. Đây sẽ là một đêm nhạc không thể bỏ qua đối với những ai yêu thích âm nhạc và nghệ thuật trình diễn.',
    location: {
      title: 'Trung tâm Hội nghị Quốc gia',
      address: '57 Trần Hưng Đạo, Quận 1'
    },
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG11c2ljJTIwZmVzdGl2YWx8ZW58MHx8MHx8fDA%3D',
    user: [],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
  },
  {
    title: 'Festival Âm nhạc Mùa Hè',
    description: 'Festival âm nhạc mùa hè tại TP.HCM năm 2024 sẽ mang đến cho khán giả một không gian âm nhạc đầy sắc màu và sôi động. Chương trình sẽ diễn ra trong suốt 2 ngày với những màn trình diễn đa dạng từ nhiều thể loại âm nhạc như pop, rock, hip-hop, và EDM. Đây không chỉ là nơi để thưởng thức âm nhạc mà còn là dịp để khán giả có thể tham gia vào các hoạt động vui chơi, giải trí, và giao lưu với những người bạn mới. Với sự tham gia của nhiều nghệ sĩ nổi tiếng trong và ngoài nước, festival hứa hẹn sẽ mang đến những phút giây thăng hoa và đáng nhớ cho tất cả những ai tham gia.',
    location: {
      title: 'Công viên 23 tháng 9',
      address: 'Phạm Ngũ Lão, Quận 1'
    },
    imageUrl: 'https://w0.peakpx.com/wallpaper/786/351/HD-wallpaper-music-concert-passionate-live-party.jpg',
    user: [],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
  }
];


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